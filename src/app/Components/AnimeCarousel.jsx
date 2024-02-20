// Import necessary modules and components
"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

const AnimeCarousel = ({ animes }) => {
  // Define background colors based on content type
  const contentTypeBg = {
    sub: "bg-[green]",
    dub: "bg-[#AC87C5]",
  };

  // Create a ref for the carousel
  const carouselRef = useRef(null);

  // Set up the interval for automatic scrolling
  useEffect(() => {
    let intervalId;

    const startInterval = () => {
      intervalId = setInterval(() => {
        if (carouselRef.current) {
          const nextScrollLeft =
            carouselRef.current.scrollLeft + carouselRef.current.clientWidth;
          const maxScrollLeft =
            carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

          if (nextScrollLeft < maxScrollLeft) {
            carouselRef.current.scrollTo({
              left: nextScrollLeft,
              behavior: "smooth",
            });
          } else {
            carouselRef.current.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }
        }
      }, 10000);
    };

    const handleScroll = () => {
      clearInterval(intervalId);
      startInterval();
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener("scroll", handleScroll);
    }

    startInterval();

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("scroll", handleScroll);
      }
      clearInterval(intervalId);
    };
  }, [carouselRef]);

  return (
    <div
      className="showcase scrollbar-hidden relative flex h-[200px] w-full snap-x snap-mandatory items-start overflow-x-auto overflow-y-hidden rounded-none md:rounded-md bg-cover bg-center bg-no-repeat transition-all md:h-[250px] md:rounded-r-none"
      ref={carouselRef}
    >
      {animes ? (
        animes.map((anime, index) => (
          <div
            key={index}
            className="grid h-full w-full flex-shrink-0 snap-start grid-cols-[65%,35%] items-center gap-1 px-2 backdrop-blur-sm backdrop-brightness-50 transition-all md:grid-cols-[75%,25%] md:px-5"
          >
            <img
              src={anime?.image}
              alt="background"
              className="absolute top-0 z-0 h-auto w-full bg-no-repeat object-contain object-center brightness-[.3]"
            />
            <div className="z-10 w-full self-start md:self-center">
              <div className="flex items-center p-2">
                <div>
                  <h1
                    className="h-8 overflow-hidden text-lg text-white md:text-2xl"
                    title={anime?.title}
                  >
                    {anime?.title}
                  </h1>
                  <h2 className="flex gap-1 text-xs uppercase text-white md:text-sm">
                    <p
                      className={`rounded bg-[#fff5] px-1 py-[2px] text-xs w-fit`}
                    >
                      {anime?.type}
                    </p>
                    <p
                      className={`w-min rounded px-1 py-[2px] text-xs ${
                        contentTypeBg[anime?.subOrDub]
                      }`}
                    >
                      {anime?.subOrDub}
                    </p>
                  </h2>
                </div>
              </div>
              {/* Genres */}
              <div className="ml-2 flex flex-col gap-2">
                <p className="h-5 w-5/6 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white md:text-sm">
                  {anime?.genres?.map((tag, index) => {
                    if (index <= 5) {
                      return (
                        <Link
                          key={index}
                          href="#"
                          className="mr-1 hover:text-purple-500"
                        >
                          {tag}
                          {index !== anime?.genres?.length - 1 && ","}
                        </Link>
                      );
                    }
                  })}
                </p>
                <h5 className="text-sm font-semibold text-white md:text-base">
                  Summary
                </h5>
                <p
                  className="line-clamp-3 h-12 w-full overflow-hidden text-xs font-light text-white md:h-14 md:text-sm"
                  title={anime?.description}
                >
                  {anime?.description}
                </p>
                <p className="flex items-center gap-1 text-xs font-normal text-white md:text-sm">
                  Status:
                  <span className={`rounded text-xs uppercase md:text-sm`}>
                    {anime?.status}
                  </span>
                </p>
              </div>
            </div>
            <Link href={`/${anime?.id}`} className="pr-3 md:pr-0">
              <img
                className="relative z-10 aspect-auto rounded hover:scale-[1.03] md:w-full"
                src={anime?.image}
                alt="anime-link"
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          Loading...
        </div>
      )}
    </div>
  );
};

// Export the AnimeCarousel component
export default AnimeCarousel;
