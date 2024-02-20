import Link from "next/link";
import { genres } from "@/API/genres";
import BookmarkBtn from "./BookmarkBtn";

const AnimeInfo = ({ anime }) => {
  return (
    <div
      className={`scrollbar pointer-events-auto z-50 flex flex-col overflow-auto rounded-none md:rounded-md bg-[#121212] py-3 md:flex-row background h-max w-full`}
    >
      <div className="flex min-w-52 flex-col items-center gap-2 md:w-56">
        <img
          src={anime?.image}
          alt="anime-cover"
          className="aspect-[1/1.5] w-2/4 rounded md:w-10/12 object-cover"
        />
        {/* Button And Follows */}
        <div className="w-9/12 text-center md:w-10/12">
          <BookmarkBtn animeId={anime?.id} />
        </div>
        {/* Language Type, Status and Type */}
        <div className="grid w-9/12 grid-cols-2 flex-col gap-1 py-2 text-sm md:flex md:w-10/12 md:py-0 md:pb-2">
          {/* Type */}
          <div
            className={`flex w-full justify-between gap-1 rounded bg-[#fff1] px-2 py-2 background`}
          >
            <p className=" font-light opacity-70">Type</p>
            <p className="flex items-center gap-1 opacity-70">
              {anime?.subOrDub?.toUpperCase()}
            </p>
          </div>
          {/* Status */}
          <div
            className={`flex w-full justify-between gap-1 rounded bg-[#fff1] px-2 py-2 background`}
          >
            <p className=" font-light opacity-70">Status</p>
            <p className="flex items-center gap-1 opacity-70">
              {anime?.status?.toUpperCase()}
            </p>
          </div>
          {/* Type */}
          <div
            className={`flex col-span-2 w-full justify-between gap-1 rounded bg-[#fff1] px-2 py-2 background items-center`}
          >
            <p className="font-light opacity-70">Release</p>
            <p className="flex items-center gap-1 opacity-70 text-xs text-center">
              {anime?.type?.toUpperCase() !== "MOVIE"
                ? anime?.type?.toUpperCase()
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {/* anime Details */}
      <div className="scrollbar max-h-full p-5 md:overflow-y-auto md:p-0">
        <p className="text-center text-2xl font-bold md:text-left">
          {anime?.title}
        </p>
        <div className="flex flex-wrap items-center text-center md:text-left justify-center gap-2 py-1 mr-3 text-sm opacity-50 md:justify-start md:text-base">
          {anime?.otherName}
        </div>
        <div className="my-2 flex flex-wrap items-center justify-center gap-1 md:justify-start">
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
        <div>
          <h1 className="py-1 md:text-base">Sypnosis:</h1>
          <p className="mt-1 pr-0 md:pr-5 text-sm font-light opacity-80 md:text-base">
            {anime?.description}
          </p>
          <div className="grid h-max grid-cols-2 py-2 text-sm md:text-base">
            <div className="flex flex-col gap-2">
              <h1>Season Released</h1>
              <p className="font-light opacity-70">
                {anime?.type?.toUpperCase() !== "MOVIE"
                  ? anime?.type?.toUpperCase()
                  : "-"}
              </p>
              <h1>Release Date</h1>
              <p className="font-light opacity-70">
                {anime?.releaseDate || "-"}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Type</h1>
              <p className="font-light opacity-70">
                {anime?.subOrDub?.toUpperCase()}
              </p>
              <h1>Episodes</h1>
              <p className="font-light opacity-70">
                {anime?.totalEpisodes || "-"}
              </p>
            </div>
          </div>
          <div>
            <h1>Genres</h1>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {anime?.genres?.map((genre, index) => (
                <Link
                  key={index}
                  href={`/filter/${genres[genre]}`}
                  className="rounded bg-[#fff1] px-2 py-1 hover:text-purple-500 hover:brightness-90"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
