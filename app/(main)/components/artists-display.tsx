import Image from "next/image";
import Link from "next/link";
import Skeleton from "./skeleton";

interface Props {
  data: any;
  loading: boolean;
}

export default function ArtistsDisplay({ data, loading }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-5 lg:gap-7 mx-auto">
      {
        loading
          ? (
            <Skeleton />
          ) : (
            <>
              {
                data?.map((e: any) => (
                  <Link href={`/artist/${e.id}`} className="w-fit max-w-[334px] p-4 flex flex-col gap-3 my-2 hover:bg-main-green hover:text-black rounded-2xl" key={e.id} >
                    <picture>
                      <source
                        media="(min-width: 1024px)"
                        srcSet={e.images[0].url}
                      />
                      <source
                        media="(min-width: 550px)"
                        srcSet={e.images[1].url}
                      />
                      <img
                        src={e.images[2].url}
                        alt="profile photo"
                        className="rounded-2xl w-[272px] h-[241px] object-cover"
                        width={272}
                        height={241}
                      />
                    </picture>
                    <h3 className="font-semibold text-[24px] max-w-[272px]">
                      {e.name}
                    </h3>

                    <p className="font-semibold">
                      Seguidores: {e.followers.total}
                    </p>

                  </Link>
                ))
              }
            </>
          )

      }
    </div>
  )
}
