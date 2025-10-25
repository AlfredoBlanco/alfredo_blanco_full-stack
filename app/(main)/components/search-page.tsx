'use client'

import { useAppSelector } from "@/lib/hooks"
import AlbumsDisplay from "./artists-display"
import SearchForm from "./search-form"
import { selectUser } from "@/lib/features/user.slice"
import { useGetArtistsQuery } from "@/lib/services/artist-service"
import { useEffect, useState } from "react"
import ArtistsDisplay from "./artists-display"
import Pagination from "./pagination"


export default function SearchPage() {
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const { data: user } = useAppSelector(selectUser);

    const { data, isLoading, isError, error, isFetching } = useGetArtistsQuery({
        token: user?.access_token,
        query,
        page: page - 1,
    }, {
        skip: !user,
        refetchOnMountOrArgChange: true,
    })

    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        setPage(1);
    }

    const handleChange = (targetPage: number) => {
        setPage(targetPage);
    }

    useEffect(() => {
        console.log(data)
    })


    return (
        <div className="flex flex-col gap-5">
            <SearchForm handleSearch={handleSearch} />

            <p>
                Mostrando 4 resultados de {data?.artists.total}
            </p>
            
            <ArtistsDisplay data={data?.artists.items} loading={isLoading || isFetching} />
            
            <Pagination page={page} totalResults={data?.artists.total} onChange={handleChange} />
            
        </div>
    )
}
