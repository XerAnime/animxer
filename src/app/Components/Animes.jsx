"use client";
import { makeRequest } from "@/API/request";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Animes = ({ filter, search, recents, typeFilter }) => {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(1);

  useEffect(() => {
    setAnimes([]);
    setLoading(true);
    // Make Request
    makeRequest(
      `${
        search
          ? `/${search}`
          : recents
          ? `/recent-episodes`
          : filter === "movies"
          ? `/movies`
          : filter === "top"
          ? `/top-airing`
          : filter === "popular"
          ? `/popular`
          : `/genre/${filter}`
      }?page=${page}${typeFilter ? `&type=${type}` : ""}`,
      { next: { revalidate: 1800 } }
    ).then((res) => {
      setAnimes(res);
      setLoading(false);
    });

    // Scrolls When User Changes Mode
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds a smooth scrolling animation
    });
  }, [page, filter, search, type]);

  return (
    <div className="background min-h-[50vh] h-full w-full rounded-none md:rounded relative pb-10">
      <header className="flex items-center justify-between border-b border-[#fff2] px-2 py-1 md:py-2">
        <p className="text-md md:text-lg">
          {filter ? filter.toUpperCase() : search ? "Search Results" : "Latest"}
        </p>
        {animes?.hasNextPage ? (
          <div className="min-w-36">
            <button
              className={`px-2 py-1 text-xs md:text-sm mx-1 rounded-sm ${
                page === 1
                  ? "bg-[#fff1] color-text"
                  : "bg-purple-500 hover:scale-105 text-white"
              }`}
              disabled={page === 1 ? true : false}
              onClick={() => setPage((prev) => parseInt(prev) - 1)}
            >
              Prev
            </button>
            <input
              type="number"
              className="increment-disabled mx-1 text-center color-text border-[#fff3] border bg-transparent max-w-10 p-1 rounded-md"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            />
            <button
              className={`px-2 py-1 text-xs md:text-sm mx-1 rounded-sm ${
                !animes?.hasNextPage
                  ? "bg-[#fff1] color-text"
                  : "bg-purple-500 hover:scale-105 text-white"
              }`}
              disabled={!animes?.hasNextPage}
              onClick={() => setPage((prev) => parseInt(prev) + 1)}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="min-w-36"></div>
        )}
      </header>
      {typeFilter && (
        <div className="px-3 py-2">
          <button
            className={`mx-1  text-white rounded px-3 text-sm md:text-base py-1 hover:scale-105 ${
              type === 1 ? "bg-[#fff1]" : "bg-purple-500"
            }`}
            onClick={() => {
              setType(1);
              setPage(1);
            }}
          >
            JP Sub
          </button>
          <button
            className={`mx-1  text-white rounded px-3 text-sm md:text-base py-1 hover:scale-105 ${
              type === 2 ? "bg-[#fff1]" : "bg-purple-500"
            }`}
            onClick={() => {
              setType(2);
              setPage(1);
            }}
          >
            Eng Dub
          </button>
          <button
            className={`mx-1  text-white rounded px-3 text-sm md:text-base py-1 hover:scale-105 ${
              type === 3 ? "bg-[#fff1]" : "bg-purple-500"
            }`}
            onClick={() => {
              setType(3);
              setPage(1);
            }}
          >
            Chinese
          </button>
        </div>
      )}
      {/* Manga Feed */}
      <div className="h-auto w-full gap-3 p-5 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5">
        {!loading ? (
          animes?.results !== undefined && animes?.results?.length !== 0 ? (
            animes?.results?.map((anime, index) => (
              <div
                key={index}
                className="w-full overflow-hidden min-w-32 hover:scale-[1.01] px-1 md:px-0 flex flex-col items-center"
              >
                <Link
                  title={anime?.title}
                  href={`/${anime?.id}`}
                  className="group"
                >
                  <img
                    className="z-10 mx-auto aspect-[1/1.4] max-h-32 md:min-h-52 min-h-60 rounded object-cover"
                    src={anime?.image}
                    alt={anime?.title}
                  />
                  <p
                    className="my-1 h-5 overflow-hidden text-center text-sm group-hover:text-purple-500 md:text-base"
                    title={anime?.title}
                  >
                    {anime?.title}
                  </p>
                </Link>
                {!search && !filter && (
                  <Link
                    className="md:text-base text-sm hover:text-purple-500"
                    href={`/${anime?.id}/watch/${anime?.episodeId}`}
                  >
                    Episode {anime?.episodeNumber}
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-center">
              There are no animes found. <br /> Try searching something else.
            </div>
          )
        ) : (
          <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
            Loading...
          </div>
        )}
      </div>
      {animes?.hasNextPage && (
        <div className="absolute bottom-2 right-5">
          <button
            className={`px-2 py-1 text-xs md:text-sm mx-1 rounded-sm ${
              page === 1
                ? "bg-[#fff1] color-text"
                : "bg-purple-500 hover:scale-105 text-white"
            }`}
            disabled={page === 1 ? true : false}
            onClick={() => setPage((prev) => parseInt(prev) - 1)}
          >
            Prev
          </button>
          <input
            type="number"
            className="increment-disabled mx-1 text-center color-text text-white border-[#fff3] border bg-transparent max-w-10 p-1 rounded-md"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          />
          <button
            className={`px-2 py-1 text-xs md:text-sm mx-1 rounded-sm ${
              !animes?.hasNextPage
                ? "bg-[#fff1] color-text"
                : "bg-purple-500 hover:scale-105 text-white"
            }`}
            disabled={!animes?.hasNextPage}
            onClick={() => setPage((prev) => parseInt(prev) + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Animes;
