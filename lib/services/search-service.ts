import { Artist, SearchArtistsResponse } from "@/app/interfaces/artist";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchService = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api.spotify.com/v1/search`,
    }),
    reducerPath: "searchs",
    endpoints: (builder) => ({
        searchArtists: builder.query<SearchArtistsResponse, { token?:string; page: number; query: string }>({
            query: ({ token, page, query }) => ({
                url: `?offset=${page * 4}&limit=4&query=${!query? 'rock argentino': query}&type=artist&market=AR&locale=es-ES,es;q%3D0.9,en;q%3D0.8`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    })
});

export const {
    useSearchArtistsQuery,
} = searchService;
