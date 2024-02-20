import Link from "next/link";
import Episodes from "@/app/Components/Episodes";
import { makeRequest } from "./../../../../API/request";
import Stream from "@/app/Components/Stream";

const page = async ({ params }) => {
  const anime = await makeRequest(`/info/${params?.id}`, { revalidate: 60 });
  const currentEpisode = anime?.episodes?.filter(
    (each) => each.id === params.episodeId
  );
  return (
    <div className="min-h-[90vh] py-10 text-center font-bold color-text">
      <div>
        <h1 className="text-2xl mx-2">{anime?.title}</h1>
        <h1 className="text-xl font-medium">
          Episode {currentEpisode[0]?.number}
        </h1>
        <div className="flex items-center justify-center gap-1 text-xs font-normal opacity-80 flex-wrap mx-3 md:mx-0">
          <p>Anime Details Can Be Found In</p>
          <Link
            href={`/${params.id}`}
            className="text-sm font-bold hover:text-purple-500"
          >
            {anime?.title}
          </Link>
        </div>
        <div className="mx-auto my-2 flex w-full px-3 md:px-0 md:w-3/5 flex-wrap items-center justify-center gap-1">
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-indigo-700 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-facebook-f"></i>
            Facebook
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-blue-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-twitter"></i>
            Twitter
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-green-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-whatsapp"></i>
            Whatsapp
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-indigo-500 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-discord"></i>
            Discord
          </Link>
          <Link
            href="#"
            className="flex min-w-20 items-center gap-2 rounded bg-red-700 px-2 py-1 text-xs font-normal tracking-wide text-white hover:scale-105"
          >
            <i className="fa-brands fa-pinterest"></i>
            Pinterest
          </Link>
        </div>
      </div>

      <Stream episodeId={params?.episodeId} />

      <Episodes
        episodes={anime?.episodes}
        animeId={anime?.id}
        episodeId={params?.episodeId}
      />
    </div>
  );
};

export default page;
