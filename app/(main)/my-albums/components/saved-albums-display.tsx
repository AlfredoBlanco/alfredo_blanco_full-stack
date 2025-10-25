'use client'

import { selectUser } from "@/lib/features/user.slice";
import { useAppSelector } from "@/lib/hooks";
import { useGetSavedAlbumsQuery } from "@/lib/services/album-service";
import { useEffect, useState } from "react";
import Pagination from "../../components/pagination";
import AlbumsCollection from "../../artist/[id]/components/albums-collection";


export default function SavedAlbumsDisplay() {
    const { data: user } = useAppSelector(selectUser);
    const [page, setPage] = useState<number>(1);

    const { data, isSuccess, isLoading, isFetching, isError, error } = useGetSavedAlbumsQuery({
        token: user?.access_token,
        page: page - 1,
    }, {
        skip: !user,
        refetchOnMountOrArgChange: true,
    });

    const handleChange = (targetPage: number) => {
        setPage(targetPage);
    }


    return (
        <div className="flex flex-col gap-5">

            <AlbumsCollection data={data?.items.map(e => e.album)} loading={isLoading || isFetching} user={user} />

            <Pagination page={page} totalResults={data?.total ?? 0} itemsPerPage={8} onChange={handleChange} />

        </div>
    )

}
