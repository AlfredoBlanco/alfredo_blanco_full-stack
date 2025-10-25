import AlbumsDisplay from "./components/albums-display";
import ArtistData from "./components/artist-data";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-5 mt-20 sm:mx-[10px]">

      <ArtistData artistId={id} />

      <AlbumsDisplay artistId={id} />
    </div>
  )
}
