import { getCarousel, getTopAnimes } from "@/API/request";
import AnimeCarousel from "./Components/AnimeCarousel";
import FeaturedAnime from "./Components/FeaturedAnime";
import Animes from "./Components/Animes";
import PopularAnimes from "./Components/PopularAnimes";
const page = async () => {
  const carousel = await getCarousel();
  const popular = await getTopAnimes();
  return (
    // Chapters And Top Anime Divider
    <div className="color-text mx-auto grid max-w-screen-2xl grid-cols-1 gap-2 px-0 py-5 md:gap-5 md:px-16 md:py-16 lg:grid-cols-[70%,30%]">
      {/* Left */}
      <div className="flex w-full flex-col gap-5  ">
        {/* Showcase Anime */}
        <div className="grid gap-2 md:grid-cols-[74%,25%]">
          {/* Top Animes Carousel */}
          <AnimeCarousel key="anime-carousel" animes={carousel} />
          {/* Top Anime Showcase */}
          <FeaturedAnime key="anime-featured" />
        </div>

        {/* Animes */}
        <Animes key="anime-feed" recents />
      </div>
      {/* Right */}
      <PopularAnimes key="anime-popular" animes={popular} />
    </div>
  );
};

export default page;
