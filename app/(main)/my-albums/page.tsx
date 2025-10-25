import SavedAlbumsDisplay from "./components/saved-albums-display";

export default function page() {
  return (
    <div className="flex flex-col sm:items-center gap-5 mt-20">
      <h1 className="font-bold text-[40px]/11 sm:text-[64px]/20 sm:leading-[] sm:text-center">
        Mis albumes <br /><span className="text-main-green">guardados</span>
      </h1>

      <p className="leading-[32px] sm:text-center sm:max-w-[50%]">
        Disfruta de tu música a un solo click y descubre que discos has guardado dentro de "mis álbumes"
      </p>

      <SavedAlbumsDisplay />
    </div>
  )
}
