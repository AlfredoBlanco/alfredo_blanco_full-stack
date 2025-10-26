import { AlbumsResponse, SavedAlbumsResponse } from "@/app/interfaces/album";
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
        getSavedAlbums: builder.query<SavedAlbumsResponse, { token?: string, page: number }>({
            query: ({ token, page }) => ({
                url: `?limit=8&offset=${page * 8}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        saveAlbum: builder.mutation<any, { token?: string, data: { ids: string[] } }>({
            query: ({ token, data }) => ({
                url: "/",
                method: "PUT",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        deleteAlbum: builder.mutation<any, { token?: string, data: { ids: string[] } }>({
            query: ({ token, data }) => ({
                url: "/",
                method: "DELETE",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    })
});

export const {
    useCheckAlbumSavedQuery,
    useGetSavedAlbumsQuery,
    useSaveAlbumMutation,
    useDeleteAlbumMutation,
} = albumService;
