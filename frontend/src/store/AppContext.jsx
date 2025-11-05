import React, { createContext, useContext, useMemo, useState } from "react";
import { endpoints } from "../services/api";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "true") === "true";

export function AppProvider({ children }) {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem("avukado_user");
        return raw ? JSON.parse(raw) : null;
    });

    function setAuth(u, token) {
        setUser(u);
        if (u) {
            localStorage.setItem("avukado_user", JSON.stringify(u));
            if (token) localStorage.setItem("avukado_token", token);
        } else {
            localStorage.removeItem("avukado_user");
            localStorage.removeItem("avukado_token");
        }
    }

    async function login(email, password) {
        if (USE_MOCK) {
            setAuth({ id: "u1", name: "Demo", email }, "mock-token");
            return { ok: true };
        }
        const { data } = await endpoints.login({ email, password });
        setAuth(data.user, data.token);
        return { ok: true };
    }

    async function register(payload) {
        if (USE_MOCK) {
            // basit mock: direkt login olmuş kabul et
            setAuth({ id: "u2", name: payload.name, email: payload.email }, "mock-token");
            return { ok: true };
        }
        const { data } = await endpoints.register(payload);
        setAuth(data.user, data.token);
        return { ok: true };
    }

    function logout() { setAuth(null); }

    const value = { user, login, register, logout };
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
