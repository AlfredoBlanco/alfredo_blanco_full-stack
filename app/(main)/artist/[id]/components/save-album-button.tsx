import { User } from "@/app/interfaces/user";
import { useCheckAlbumSavedQuery } from "@/lib/services/album-service";
import { useEffect, useState } from "react";


interface Props {
    user: User | null;
    albumId: string;
}

export default function SaveAlbumButton({ user, albumId }: Props) {
    const [saved, setSaved] = useState<boolean>(false);
    const { data, isSuccess, isError, error } = useCheckAlbumSavedQuery({
        token: user?.access_token,
        albumId
    }, {
        skip: !user || !albumId,
        refetchOnMountOrArgChange: true
    })

    useEffect(() => {
        if(isSuccess) {
            setSaved(data[0]);
        }
    }, [isSuccess])

    return (
        <button className={`w-fit p-3 px-6 font-semibold ${saved? 'bg-main-red' : 'bg-main-green text-black'} cursor-pointer rounded-full`}>
            {
                saved
                ? '- Quitar album'
                : '+ Agregar album'
            }
        </button>
    )
}
