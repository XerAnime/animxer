"use client";
import { makeRequest } from "@/API/request";
import Hls from "hls.js";
import { useEffect, useState } from "react";

const Stream = ({ episodeId }) => {
  const [currentServer, setCurrentServer] = useState("vidstreaming");
  const [quality, setQuality] = useState("default");
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    makeRequest(`/watch/${episodeId}?server=${currentServer}`, {
      cache: "no-cache",
    }).then((res) => setEpisode(res));
  }, [episodeId]);

  useEffect(() => {
    let url = "";
    episode?.sources?.map((source) => {
      if (source.quality === quality) {
        url = source.url;
      }
    });

    const video = document.querySelector("#video-player");

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }
  }, [episode, quality]);

  return (
    <div className="md:w-10/12 w-full mx-auto py-2">
      <header className="p-2 flex items-center justify-between">
        <div>
          <h1 className="text-left text-sm md:text-base">Quality</h1>
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="color-text bg-transparent py-1.5 px-3 border cursor-pointer border-[#fff3] rounded-md text-xs md:text-base"
          >
            {episode?.sources?.map((source) => {
              return (
                <option
                  className="text-black"
                  key={source.quality}
                  value={source.quality}
                >
                  {source?.quality}
                </option>
              );
            })}
          </select>
        </div>
        <a
          href={episode?.download}
          target="_blank"
          className="px-2 py-1.5 rounded-sm self-end hover:scale-105 text-white bg-purple-500 font-normal text-xs md:text-base"
        >
          Download
        </a>
      </header>
      <video
        controls
        id="video-player"
        autoPlay
        className="w-full h-full rounded-none md:rounded-md border border-[#fff1]"
      />
    </div>
  );
};

export default Stream;
