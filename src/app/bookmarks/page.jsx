"use client";
import { useState, useEffect } from "react";
import { getTopAnimes, makeRequest } from "@/API/request";
import PopularAnimes from "./../Components/PopularAnimes";
import Link from "next/link";

const page = () => {
  const [popular, setPopular] = useState(null);
  const [bookmarks, setBookmarks] = useState(null);
  const [animeDetails, setAnimeDetails] = useState([]);

  useEffect(() => {
    getTopAnimes().then((res) => setPopular(res));
  }, []);

  useEffect(() => {
    setBookmarks(JSON.parse(localStorage.getItem("bookmarks")) || []);
  }, []);

  useEffect(() => {
    if (Array.isArray(bookmarks)) {
      Promise.all(bookmarks.map((bookmark) => makeRequest(`/info/${bookmark}`)))
        .then((details) => {
          setAnimeDetails(details);
        })
        .catch((error) => {
          console.error("Error fetching anime details:", error);
        });
    }
  }, [bookmarks]);

  return (
    <div className="color-text my-5 mx-0 grid max-w-screen-2xl grid-cols-1 gap-2 md:mx-auto md:gap-5 md:px-16 md:py-16 lg:grid-cols-[70%,30%]">
      <div>
        <div className="h-auto w-full gap-3 px-3 py-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 bg-[#fff1] rounded-md">
          <header className="md:text-2xl text-lg font-medium border-b border-[#fff1] md:col-span-5 sm:col-span-4 col-span-2">
            Bookmarks
          </header>
          {animeDetails?.length != 0 ? (
            animeDetails?.map((anime, index) => (
              <div
                key={index}
                className="overflow-hidden min-w-32 hover:scale-[1.01] px-1 md:px-0 flex flex-col items-center"
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
              </div>
            ))
          ) : (
            <h1 className="flex justify-center items-center min-h-[20vh] md:col-span-5 sm:col-span-4 col-span-2">
              No Bookmarks Found.
            </h1>
          )}
        </div>
      </div>
      {popular !== null ? <PopularAnimes animes={popular} /> : <div></div>}
    </div>
  );
};

export default page;
