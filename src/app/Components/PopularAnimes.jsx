"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const PopularAnimes = ({ animes }) => {
  const [toggle, setToggle] = useState(true);
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    setDisplayed([]);
    if (toggle) {
      setDisplayed(animes?.popular);
    } else {
      setDisplayed(animes?.top);
    }
  }, [toggle]);

  const handleToggle = (toggle) => {
    setToggle(toggle);
  };

  return (
    <div className="background color-text h-max w-full overflow-hidden rounded-none md:rounded-md">
      <header key="header" className="flex border-b-[1px] border-[#fff1]">
        <button
          className={`px-3  py-2 ${toggle ? "text-purple-500" : ""}`}
          onClick={() => handleToggle(true)}
        >
          Popular
        </button>
        <button
          className={`px-3 py-2 ${!toggle ? "text-purple-500" : ""}`}
          onClick={() => handleToggle(false)}
        >
          Top Airing
        </button>
      </header>
      {/* Animes */}
      {displayed?.map((anime, index) => {
        if (index < 10) {
          return (
            <div
              key={index}
              className={`group overflow-hidden relative h-28 max-h-28 rounded my-2 mx-2 ${
                index === 0 ? "" : "border-t border-[#fff1]"
              }`}
            >
              <div className="bg-purple-500 text-white w-28 absolute top-2 z-20 text-center py-1 -rotate-45 left-[-2rem]">
                <p className="rotate-45">{index + 1}</p>
              </div>
              <Link key={index} href={`/${anime?.id}`}>
                <img
                  className="absolute w-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded brightness-50"
                  src={anime?.image}
                />
                <p className="w-4/5 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center line-clamp-2 z-10 text-white text-xl font-bold group-hover:text-purple-500">
                  {anime.title}
                </p>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default PopularAnimes;
