import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseApi } from "./api/baseApi";

// API endpoint'lerini import et (inject edilmiş olmaları için)
import "./api/authApi";
import "./api/adsApi";
import "./api/lawyersApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

