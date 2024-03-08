import { getTopAnimes, makeRequest } from "@/API/request";
import Link from "next/link";
import AnimeInfo from "./../Components/AnimeInfo";
import Episodes from "./../Components/Episodes";
import PopularAnimes from "./../Components/PopularAnimes";
import ErrorPage from "./../Components/ErrorPage";

const page = async ({ params }) => {
  const anime = await makeRequest(`/info/${params?.id}`, { cache: "no-store" });
  const popular = await getTopAnimes();
  return anime?.id !== undefined ? (
    <div className="color-text my-5 mx-0 grid max-w-screen-2xl grid-cols-1 gap-2 md:mx-auto md:gap-5 md:px-16 md:py-16 lg:grid-cols-[70%,30%]">
      <div>
        {/* Navigation Link */}
        <div className="background mb-2 flex h-max w-full gap-2 rounded-none md:rounded bg-[#fff1] px-5 py-3 text-sm">
          <Link href="/" className="hover:text-purple-500">
            Home
          </Link>
          <span>/</span>
          <p className="line-clamp-1">{anime?.title}</p>
        </div>
        {/* Anime Info */}
        <AnimeInfo anime={anime} />
        {/* Anime Chapters */}
        <Episodes episodes={anime?.episodes} animeId={anime?.id} />
      </div>
      <PopularAnimes animes={popular} />
    </div>
  ) : (
    <ErrorPage />
  );
};

export default page;
