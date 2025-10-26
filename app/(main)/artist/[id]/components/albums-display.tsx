'use client'
import { selectUser } from "@/lib/features/user.slice";
import { useAppSelector } from "@/lib/hooks";
import { useGetArtistAlbumsQuery } from "@/lib/services/artist-service";
import { useEffect, useState } from "react";
import AlbumsCollection from "./albums-collection";
import Pagination from "@/app/(main)/components/pagination";
import { useHandleError } from "@/app/hooks/use-handle-errors";
import NoResults from "@/app/(main)/components/no-results";

interface Props {
    artistId: string;
}

export default function AlbumsDisplay({ artistId }: Props) {
    const { data: user } = useAppSelector(selectUser);
    const [page, setPage] = useState<number>(1);
    const handleError = useHandleError();

    const { data, isLoading, isFetching, isError, error } = useGetArtistAlbumsQuery({
        token: user?.access_token,
        artistId,
        page: page - 1,
    }, {
        skip: !user,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (isError) {
            handleError(error);
        }
    }, [isError])

    const handleChange = (targetPage: number) => {
        setPage(targetPage);
    }

    return (
        <div className="flex flex-col gap-5">
            {
                isError
                    ? <NoResults />
                    : <AlbumsCollection data={data?.items} loading={isLoading || isFetching} user={user} />
            }

            <Pagination page={page} totalResults={data?.total ?? 0} itemsPerPage={8} onChange={handleChange} />

        </div>
    )

}
