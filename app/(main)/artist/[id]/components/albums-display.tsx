'use client'
import { selectUser } from "@/lib/features/user.slice";
import { useAppSelector } from "@/lib/hooks";
import { useGetArtistAlbumsQuery } from "@/lib/services/artist-service";
import { useEffect, useState } from "react";
import AlbumsCollection from "./albums-collection";
import Pagination from "@/app/(main)/components/pagination";

interface Props {
    artistId: string;
}

export default function AlbumsDisplay({ artistId }: Props) {
    const { data: user } = useAppSelector(selectUser);
    const [page, setPage] = useState<number>(1);

    const { data, isSuccess, isLoading, isFetching, isError, error } = useGetArtistAlbumsQuery({
        token: user?.access_token,
        artistId,
        page: page - 1,
    }, {
        skip: !user,
    });

    const handleChange = (targetPage: number) => {
        setPage(targetPage);
    }

    useEffect(() => {
        console.log(data);
    }, [data])


    return (
        <div className="flex flex-col gap-5">

            <AlbumsCollection data={data?.items} loading={isLoading || isFetching} user={user} />

            <Pagination page={page} totalResults={data?.total?? 0} onChange={handleChange} />

        </div>
    )

}
