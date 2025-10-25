import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const albumService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api.spotify.com/v1/me/albums`,
    }),
    reducerPath: "albums",
    endpoints: (builder) => ({
        checkAlbumSaved: builder.query<boolean[], { token?: string, albumId: string }>({
            query: ({ token, albumId }) => ({
                url: `/contains?ids=${albumId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    })
});

export const {
    useCheckAlbumSavedQuery,
} = albumService;
