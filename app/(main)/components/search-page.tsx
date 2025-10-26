'use client'

import { useAppSelector } from "@/lib/hooks"
import SearchForm from "./search-form"
import { selectUser } from "@/lib/features/user.slice"
import { useEffect, useState } from "react"
import ArtistsDisplay from "./artists-display"
import Pagination from "./pagination"
import { useSearchArtistsQuery } from "@/lib/services/search-service"
import { useHandleError } from "@/app/hooks/use-handle-errors"
import NoResults from "./no-results"


export default function SearchPage() {
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const { data: user } = useAppSelector(selectUser);
    const handleError = useHandleError();

    const { data, isLoading, isError, error, isFetching } = useSearchArtistsQuery({
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
        if(isError) {
            handleError(error);
        }
    }, [isError])

    return (
        <div className="flex flex-col gap-5">
            <SearchForm handleSearch={handleSearch} />

            <p>
                Mostrando 4 resultados de {data?.artists.total}
            </p>
            {
                isError
                ? <NoResults />
                : <ArtistsDisplay data={data?.artists.items} loading={isLoading || isFetching} />
            }
            <Pagination page={page} totalResults={data?.artists.total?? 0} onChange={handleChange} />

        </div>
    )
}
