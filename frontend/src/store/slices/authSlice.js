import { createSlice } from "@reduxjs/toolkit";

// localStorage'dan başlangıç değerlerini yükle
const getInitialUser = () => {
    const raw = localStorage.getItem("avukado_user");
    return raw ? JSON.parse(raw) : null;
};

const initialState = {
    user: getInitialUser(),
    token: localStorage.getItem("avukado_token") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            
            if (user) {
                localStorage.setItem("avukado_user", JSON.stringify(user));
                if (token) localStorage.setItem("avukado_token", token);
            } else {
                localStorage.removeItem("avukado_user");
                localStorage.removeItem("avukado_token");
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("avukado_user");
            localStorage.removeItem("avukado_token");
            localStorage.removeItem("avukado_role");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => !!state.auth.token;

