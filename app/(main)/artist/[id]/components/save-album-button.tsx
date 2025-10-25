import { User } from "@/app/interfaces/user";
import { useCheckAlbumSavedQuery, useDeleteAlbumMutation, useSaveAlbumMutation } from "@/lib/services/album-service";
import { useEffect, useState } from "react";


interface Props {
    user: User | null;
    albumId: string;
}

export default function SaveAlbumButton({ user, albumId }: Props) {
    const [saved, setSaved] = useState<boolean>(false);
    const { data, isSuccess, isLoading, isError, error, refetch } = useCheckAlbumSavedQuery({
        token: user?.access_token,
        albumId
    }, {
        skip: !user || !albumId,
        refetchOnMountOrArgChange: true
    })
    const [
        saveAlbum,
        {
            isSuccess: isSaveSuccess,
            isError: isSaveError,
            error: saveError,
            isLoading: isSaveLoading,
            reset: resetSave,
        }
    ] = useSaveAlbumMutation();
    const [
        deleteAlbum,
        {
            isSuccess: isDeleteSuccess,
            isError: isDeleteError,
            error: deleteError,
            isLoading: isDeleteLoading,
            reset: resetDelete,
        }
    ] = useDeleteAlbumMutation();

    useEffect(() => {
        if (isSuccess) {
            setSaved(data[0]);
        }
    }, [isSuccess, isLoading])

    useEffect(() => {
        if (isSaveSuccess) {
            setSaved(true);
            resetSave();
            refetch();
        }
        if(isDeleteSuccess) {
            setSaved(false);
            resetDelete();
            refetch();
        }
    }, [isSaveSuccess, isDeleteSuccess])

    const handleAction = async () => {
        if (saved) {
            await deleteAlbum({
                token: user?.access_token,
                data: {
                    ids: [albumId],
                }
            })
        }
        if (!saved) {
            await saveAlbum({
                token: user?.access_token,
                data: {
                    ids: [albumId],
                }
            })
        }
    }

    return (
        <button
            onClick={handleAction}
            className={`mt-auto w-fit p-3 px-6 font-semibold ${saved ? 'bg-main-red' : 'bg-main-green text-black'} cursor-pointer rounded-full`}
            disabled={isLoading || isSaveLoading || isDeleteLoading}
        >
            {
                isSaveLoading || isDeleteLoading
                    ? <div className="h-[14px] w-[16px] inline-block rounded-full border-2 animate-spin mr-1" />
                    : saved
                        ? `− `
                        : '+ '
            }
            {
                saved
                    ? `Quitar album`
                    : 'Agregar album'
            }

        </button>
    )
}
