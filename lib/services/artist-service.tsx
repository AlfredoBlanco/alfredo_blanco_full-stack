import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artitsService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: ``,
    }),
    reducerPath: "artists",
    endpoints: (builder) => ({
        getArtists: builder.query({
            query: ({ token, page, query }) => ({
                url: `https://api.spotify.com/v1/search?offset=${page * 4}&limit=4&query=${!query? 'rock argentino': query}&type=artist&market=AR&locale=es-ES,es;q%3D0.9,en;q%3D0.8`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    })
});

export const {
    useGetArtistsQuery
} = artitsService;
