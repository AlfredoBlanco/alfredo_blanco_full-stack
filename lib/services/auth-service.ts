import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: ``,
    }),
    reducerPath: "auth",
    endpoints: (builder) => ({
        authenticate: builder.mutation({
            query: (data) => ({
                url: "/api/login",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useAuthenticateMutation
} = authService;
