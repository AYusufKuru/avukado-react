import { baseApi } from "./baseApi";
import { getJson } from "../../services/api";
import { endpoints } from "../../services/api";

export const lawyersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLawyers: builder.query({
            queryFn: async (params = {}) => {
                try {
                    // endpoints.getLawyers fonksiyonu yoksa direkt path kullan
                    const path = endpoints.lawyers || "/api/Lawyers";
                    const data = await getJson(path, { query: params });
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            providesTags: ["Lawyers"],
        }),

        getLawyerById: builder.query({
            queryFn: async (id) => {
                try {
                    const path = endpoints.lawyers || "/api/Lawyers";
                    const data = await getJson(`${path}/${id}`);
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            providesTags: (result, error, id) => [{ type: "Lawyers", id }],
        }),
    }),
});

export const { useGetLawyersQuery, useGetLawyerByIdQuery } = lawyersApi;

