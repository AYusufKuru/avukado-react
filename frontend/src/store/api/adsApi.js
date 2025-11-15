import { baseApi } from "./baseApi";
import { getJson, postJson, putJson, delJson } from "../../services/api";
import { endpoints } from "../../services/api";

export const adsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAds: builder.query({
            queryFn: async (params = {}) => {
                try {
                    const data = await getJson(endpoints.ads, { query: params });
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            providesTags: ["Ads"],
        }),

        getAdById: builder.query({
            queryFn: async (id) => {
                try {
                    const data = await getJson(`${endpoints.ads}/${id}`);
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            providesTags: (result, error, id) => [{ type: "Ads", id }],
        }),

        createAd: builder.mutation({
            queryFn: async (adData) => {
                try {
                    const data = await postJson(endpoints.ads, adData);
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            invalidatesTags: ["Ads"],
        }),

        updateAd: builder.mutation({
            queryFn: async ({ id, ...adData }) => {
                try {
                    const data = await putJson(`${endpoints.ads}/${id}`, adData);
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: "Ads", id }, "Ads"],
        }),

        deleteAd: builder.mutation({
            queryFn: async (id) => {
                try {
                    await delJson(`${endpoints.ads}/${id}`);
                    return { data: { id } };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            invalidatesTags: ["Ads"],
        }),

        getAdProposals: builder.query({
            queryFn: async (adId) => {
                try {
                    const data = await getJson(endpoints.adProposals(adId));
                    return { data };
                } catch (error) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message } };
                }
            },
            providesTags: (result, error, adId) => [{ type: "Proposals", id: adId }],
        }),
    }),
});

export const {
    useGetAdsQuery,
    useGetAdByIdQuery,
    useCreateAdMutation,
    useUpdateAdMutation,
    useDeleteAdMutation,
    useGetAdProposalsQuery,
} = adsApi;

