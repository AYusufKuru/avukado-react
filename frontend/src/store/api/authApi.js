import { baseApi, BASE_URL } from "./baseApi";
import { setCredentials } from "../slices/authSlice";
import { getJson, putJson, getToken } from "../../services/api";
import { endpoints } from "../../services/api";

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "false") === "true";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            queryFn: async (credentials, { dispatch }) => {
                if (USE_MOCK) {
                    const mockUser = { id: "u1", name: "Demo", email: credentials.email };
                    const mockToken = "mock-token";
                    dispatch(setCredentials({ user: mockUser, token: mockToken }));
                    return { data: { user: mockUser, token: mockToken } };
                }

                try {
                    const response = await fetch(`${BASE_URL}/api/Auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(credentials),
                    });

                    if (!response.ok) {
                        const text = await response.text().catch(() => "");
                        throw new Error(`${response.status} ${response.statusText}${text ? ` – ${text}` : ""}`);
                    }

                    const data = await response.json();
                    const token = data?.token ?? data?.Token ?? (typeof data === "string" ? data : "");
                    const user = data?.user || { email: credentials.email };

                    if (token) {
                        dispatch(setCredentials({ user, token }));
                    }

                    return { data: { user, token } };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            invalidatesTags: ["Auth"],
        }),

        register: builder.mutation({
            queryFn: async (payload, { dispatch }) => {
                if (USE_MOCK) {
                    const mockUser = { id: "u2", name: payload.name, email: payload.email };
                    const mockToken = "mock-token";
                    dispatch(setCredentials({ user: mockUser, token: mockToken }));
                    return { data: { user: mockUser, token: mockToken } };
                }

                try {
                    let response;
                    const isFormData = payload instanceof FormData;

                    if (isFormData) {
                        // FormData için multipart/form-data
                        response = await fetch(`${BASE_URL}/api/Auth/register`, {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                            },
                            body: payload,
                        });
                    } else {
                        // JSON için
                        response = await fetch(`${BASE_URL}/api/Auth/register`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                            body: JSON.stringify(payload),
                        });
                    }

                    if (!response.ok) {
                        const text = await response.text().catch(() => "");
                        throw new Error(`${response.status} ${response.statusText}${text ? ` – ${text}` : ""}`);
                    }

                    const data = await response.json();
                    const token = data?.token ?? data?.Token;
                    const user = data?.user || { name: payload.name, email: payload.email, role: payload.role };

                    if (token) {
                        dispatch(setCredentials({ user, token }));
                        if (payload.role) {
                            localStorage.setItem("avukado_role", payload.role);
                        }
                    }

                    return { data: { user, token } };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            invalidatesTags: ["Auth"],
        }),

        getProfile: builder.query({
            queryFn: async () => {
                try {
                    const data = await getJson(endpoints.profile);
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            providesTags: ["Profile"],
        }),

        updateProfile: builder.mutation({
            queryFn: async (profileData, { dispatch }) => {
                try {
                    const data = await putJson(endpoints.profile, profileData);
                    // Redux store'u güncelle
                    if (data?.user) {
                        dispatch(setCredentials({ 
                            user: data.user, 
                            token: getToken() 
                        }));
                    }
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            invalidatesTags: ["Profile", "Auth"],
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery, useUpdateProfileMutation } = authApi;

