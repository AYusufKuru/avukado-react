import { postJSON } from "./api";
export async function login(email, password) {
    const data = await postJSON("/auth/login", { email, password }); // örn. /api/auth/login -> proxy ekler
    if (data?.token) localStorage.setItem("avukado_token", data.token);
    return data;
}
