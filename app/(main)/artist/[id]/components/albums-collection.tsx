import { Album as AlbumType } from "@/app/interfaces/album";
import Image from "next/image";
import Link from "next/link";
import Album from "./album";
import Skeleton from "@/app/(main)/components/skeleton";
import { User } from "@/app/interfaces/user";

interface Props {
  user: User | null;
  data?: AlbumType[];
  loading: boolean;
}

export default function AlbumsCollection({ data, loading, user }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-5 lg:gap-7 mx-auto">
      {
        loading
          ? (
            <Skeleton />
          ) : (
            <>
              {
                data?.map((e: AlbumType) => {
                  return (
                    <Album album={e} key={e.id} user={user} />
                  )

                })
              }
            </>
          )

      }
    </div>
  )
}
