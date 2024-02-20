"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Episodes = ({ episodes, animeId, episodeId }) => {
  const router = useRouter();

  const [maxEpisodes, setMaxEpisodes] = useState(99);
  const [minEpisodes, setMinEpisodes] = useState(-1);
  const [currentSet, setCurrentSet] = useState({ min: 0, max: 100 });
  const itemsPerPage = 100;

  const [currentEpisode, setCurrentEpisode] = useState(episodeId || "");
  const [nextEpisode, setNextEpisode] = useState(null);
  const [prevEpisode, setPrevEpisode] = useState(null);

  const buttonCount = Math.ceil(episodes?.length / itemsPerPage);

  useEffect(() => {
    setCurrentEpisode(episodeId || "");
    episodes?.map((episode, index) => {
      if (episode.id === episodeId) {
        if (index !== 0) {
          setPrevEpisode(episodes[index - 1]?.id);
        }
        if (index + 1 !== episodes.length) {
          setNextEpisode(episodes[index + 1]?.id);
        }
      }
    });
  }, [episodeId, episodes]);

  const handleButton = (epId) => {
    router.push(`/${animeId}/watch/${epId}`);
  };

  const handleFilter = (min, max) => {
    setMinEpisodes(min);
    setMaxEpisodes(max);
    setCurrentSet({ min: min, max: max });
  };

  const filterButtons = Array.from({ length: buttonCount }, (v, index) => {
    const start = index * itemsPerPage;
    const end = Math.min((index + 1) * itemsPerPage - 1, episodes.length - 1);
    const label = `${start + 1} - ${end + 1}`;

    return (
      <button
        key={`button-${index}`}
        className={`px-1 md:px-2 py-1 rounded text-xs md:text-sm w-24 flex-grow hover:scale-105 ${
          currentSet?.min === start || currentSet?.max === end
            ? "bg-purple-500"
            : "bg-[#fff1]"
        }`}
        onClick={() => handleFilter(start, end)}
      >
        {label}
      </button>
    );
  });

  return (
    <div
      className={`background mt-3 md:rounded ${
        episodeId
          ? "md:w-8/12 w-10/12 mx-auto rounded-sm"
          : "w-full rounded-none"
      }`}
    >
      <div className="font-bold border-b border-[#fff2] w-full px-3 py-2 text-lg flex items-center justify-between">
        <p className="text-lg color-text">EPISODES</p>
        {episodeId && (
          <div className="md:text-base text-sm">
            {prevEpisode !== null ? (
              <button
                className="mx-1 min-w-10 rounded hover:scale-105 text-white bg-purple-500 px-3 md:px-5 py-1 font-normal"
                onClick={() => handleButton(prevEpisode)}
              >
                Prev
              </button>
            ) : (
              <button
                className="mx-1 min-w-10 rounded hover:scale-105 color-text bg-[#fff1] px-3 md:px-5 py-1 font-normal"
                disabled
              >
                Prev
              </button>
            )}
            {nextEpisode !== null ? (
              <button
                className="mx-1 min-w-10 rounded hover:scale-105 text-white bg-purple-500 px-3 md:px-5 py-1 font-normal"
                onClick={() => handleButton(nextEpisode)}
              >
                Next
              </button>
            ) : (
              <button
                className="mx-1 min-w-10 rounded hover:scale-105 color-text bg-[#fff1] px-3 md:px-5 py-1 font-normal"
                disabled
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
      {episodes?.length > itemsPerPage && (
        <div className="px-3 py-2 flex flex-wrap gap-2">{filterButtons}</div>
      )}
      {episodes?.length === 0 ? (
        <p className="px-3 py-2">
          There are no episodes found. This anime may not yet be aired.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 md:gap-3 px-3 py-2 md:max-h-80 max-h-48 overflow-y-scroll scrollbar">
          {episodes?.map((episode, index) => {
            if (index >= minEpisodes && index <= maxEpisodes) {
              return (
                <Link
                  key={episode?.number}
                  href={`/${animeId}/watch/${episode.id}`}
                  className={`${
                    episode?.id === episodeId
                      ? "bg-purple-700"
                      : "bg-purple-500"
                  } hover:scale-105 px-2 py-1 w-20 flex-grow max-w-24 md:w-24 md:max-w-32`}
                >
                  <div className="text-center text-xs md:text-base text-white">
                    <p>EP {episode.number}</p>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Episodes;
