"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { makeRequest } from "@/API/request";

const FeaturedAnime = () => {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    const getFeaturedAnime = async () => {
      const storedFeatured = localStorage.getItem("featured");
      if (storedFeatured) {
        const { anime, date } = JSON.parse(storedFeatured);
        const storedDate = new Date(date);
        const currentDate = new Date();
        if (
          storedDate.getUTCDate() === currentDate.getUTCDate() &&
          storedDate.getUTCMonth() === currentDate.getUTCMonth() &&
          storedDate.getUTCFullYear() === currentDate.getUTCFullYear()
        ) {
          setFeatured(anime);
          return;
        }
      }
      const randomAnimeIndex = Math.floor(Math.random() * 20);
      const req = await makeRequest(`/popular?page=${randomAnimeIndex}`);
      const randomIndex = Math.floor(Math.random() * 20);

      const newFeaturedWithDate = {
        anime: req?.results[randomIndex],
        date: new Date().toISOString().split("T")[0],
      };

      localStorage.setItem("featured", JSON.stringify(newFeaturedWithDate));
      setFeatured(req?.results[randomIndex]);
    };

    getFeaturedAnime();
  }, []);

  return (
    <Link
      href={`/${featured?.id}`}
      className="group relative hidden overflow-hidden md:block"
    >
      <img
        className="absolute h-[250px] w-full rounded-r-md object-cover object-center brightness-90"
        src={featured?.image}
      />
      <div className="absolute right-[-35%] top-[8%] w-full rotate-45 bg-red-500 text-center text-white md:text-base">
        Featured
      </div>
      <div className="overlay absolute bottom-0 flex h-full w-full translate-y-full transform flex-col items-center justify-end pb-2 text-center transition-transform duration-300 group-hover:translate-y-0">
        <h1 className="flex h-max w-5/6 items-center justify-center text-base text-white md:text-lg">
          {featured?.title}
        </h1>
      </div>
    </Link>
  );
};

export default FeaturedAnime;
