import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../services/api";

// .env yoksa Node.js Express backend portuna düş (3000). Sondaki '/' varsa kaldır.
const RAW_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000").trim();
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

