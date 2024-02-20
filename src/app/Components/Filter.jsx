"use client";
import { genres } from "@/API/genres";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Filter = ({ currentGenre }) => {
  const router = useRouter();
  const genreArray = Object.keys(genres).map((title) => ({
    id: genres[title],
    title: title,
  }));

  const handleChange = (event) => {
    const { value } = event.target;
    router.push(`/filter/${value}`);
  };

  return (
    <div className="background py-2 px-3 md:rounded flex justify-between items-center">
      <select
        name="genre-selector"
        id="genre-selector"
        className="bg-transparent border border-[#fff1] px-1 py-1 rounded color-text"
        value={currentGenre ? currentGenre : "default"}
        onChange={handleChange}
      >
        <option value="default" key="default" hidden selected={!currentGenre}>
          Genre
        </option>
        {genreArray.map((genre, index) => (
          <option className="text-black" key={index} value={genre?.id}>
            {genre?.title}
          </option>
        ))}
      </select>
      <div className="flex gap-2 items-center text-sm md:text-base">
        <Link
          className="bg-purple-500 px-2 py-1 hover:scale-105 rounded-sm"
          href="/filter/top"
        >
          Top Airing
        </Link>
        <Link
          className="bg-purple-500 px-2 py-1 hover:scale-105 rounded-sm"
          href="/filter/popular"
        >
          Popular
        </Link>
      </div>
    </div>
  );
};

export default Filter;
