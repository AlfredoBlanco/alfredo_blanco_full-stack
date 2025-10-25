'use client'

import { selectUser } from "@/lib/features/user.slice";
import { useAppSelector } from "@/lib/hooks";
import { useGetArtistDataQuery } from "@/lib/services/artist-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
    artistId: string;
}

export default function ArtistData({ artistId }: Props) {
    const { data: user } = useAppSelector(selectUser);
    const router = useRouter();

    const { data, isSuccess, isLoading, isError, error } = useGetArtistDataQuery({
        token: user?.access_token,
        artistId,
    }, {
        skip: !user,
    });

    if (isSuccess && data) {
        return (
            <>
                <div className="flex flex-col sm:flex-row sm:items-center gap-7">
                    <picture>
                        <source
                            media="(min-width: 1024px)"
                            srcSet={data.images[0].url}
                        />
                        <source
                            media="(min-width: 550px)"
                            srcSet={data.images[1].url}
                        />
                        <img
                            src={data.images[2].url}
                            alt="profile photo"
                            className="rounded-full w-[169px] h-[168px] sm:w-[237px] sm:h-[236px] object-cover"
                        />
                    </picture>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-semibold flex items-center">
                                <Image src={'/icons/verified.svg'} width={24} height={24} alt="verified" className="mr-3 inline" />
                                Artista certificado
                            </h3>
                            <h1 className="font-bold text-[40px] lg:text-[64px]">
                                {data.name}
                            </h1>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">
                                Seguidores: {data.followers.total}
                            </p>
                            <p className="font-semibold">
                                Oyentes mensuales: {data.popularity}
                            </p>
                        </div>
                    </div>

                </div>
                <p className="mt-5">
                    Guarda tus álbumes favoritos de {data.name}
                </p>
            </>
        )
    }

}
