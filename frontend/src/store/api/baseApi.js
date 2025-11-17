import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../services/api";

// Backend Base URL
// Development: http://localhost:3000
// Production: VITE_API_URL environment variable ile veya burayı elle değiştirin
// Örnek production: "https://avukado-9ua7p.sevalla.app"
const RAW_BASE = ("https://avukado-9ua7p.sevalla.app").trim();
export const BASE_URL = RAW_BASE.replace(/\/+$/, "");

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getToken();
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            headers.set("Accept", "application/json, text/plain;q=0.9,*/*;q=0.8");
            return headers;
        },
    }),
    tagTypes: ["Auth", "Ads", "Lawyers", "Proposals"],
    endpoints: () => ({}),
});

