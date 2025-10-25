import { Album as AlbumType } from "@/app/interfaces/album"
import SaveAlbumButton from "./save-album-button";
import { User } from "@/app/interfaces/user";

interface Props {
    user: User | null;
    album: AlbumType;
}

export default function Album({ album, user }: Props) {
    return (
        <div className="w-fit max-w-[334px] h-full p-4 flex flex-col gap-3 my-2 rounded-2xl" >
            <picture>
                <source
                    media="(min-width: 1024px)"
                    srcSet={album.images[0].url}
                />
                <source
                    media="(min-width: 550px)"
                    srcSet={album.images[1].url}
                />
                <img
                    src={album.images[2].url}
                    alt="profile photo"
                    className="rounded-2xl w-[272px] h-[241px] object-cover"
                    width={272}
                    height={241}
                />
            </picture>
            <h3 className="font-semibold text-[24px] max-w-[272px]">
                {album.name}
            </h3>

            <p className="font-semibold">
                Publicado: {album.release_date}
            </p>

            <SaveAlbumButton user={user} albumId={album.id} />

        </div>
    )
}
