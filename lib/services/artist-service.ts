import { AlbumsResponse } from "@/app/interfaces/album";
import { Artist } from "@/app/interfaces/artist";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artistsService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api.spotify.com/v1/artists`,
    }),
    reducerPath: "artists",
    endpoints: (builder) => ({
        getArtistData: builder.query<Artist, { token?: string, artistId: string }>({
            query: ({ token, artistId }) => ({
                url: `/${artistId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
        getArtistAlbums: builder.query<AlbumsResponse, { token?: string, artistId: string, page: number }>({
            query: ({ token, artistId, page }) => ({
                url: `/${artistId}/albums?limit=8&offset=${page * 8}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    })
});

export const {
    useGetArtistDataQuery,
    useGetArtistAlbumsQuery,
} = artistsService;
