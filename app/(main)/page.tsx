import SearchPage from "./components/search-page";

export default function page() {
  return (
    <div className="flex flex-col sm:items-center gap-5 mt-10">
      <h1 className="font-bold text-[40px] sm:text-[64px] sm:text-center">
        Busca tus <br /><span className="text-main-green">artistas</span>
      </h1>

      <p className="sm:text-center sm:max-w-[50%]">
        Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos
      </p>


      <SearchPage />
    </div>
  )
}
