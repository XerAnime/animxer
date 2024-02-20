"use client";
import Link from "next/link";
import ToggleSwitch from "./ToggleSwitch";
import SearchBox from "./SearchBox";
import { useRouter } from "next/navigation";
import { getRandomAnime } from "@/API/request";

const NavBar = () => {
  const router = useRouter();

  const randomize = async () => {
    const id = await getRandomAnime();
    router.push(`/${id}`);
  };

  return (
    <nav className="mx-auto max-w-screen-2xl">
      {/* Logo And Search : Top */}
      <div className="flex h-10 w-full items-center justify-between px-2 py-6 md:px-20">
        <Link
          href="/"
          className="color-text text-base md:text-2xl font-semibold tracking-wide flex items-center"
        >
          <p className="md:block hidden">AnimXer</p>
          <img
            src="/logo.png"
            alt="nav-logo"
            className="w-20 h-20 md:hidden block"
          />
        </Link>

        <div className="color-text flex items-center gap-3 md:gap-5">
          <SearchBox />
          <ToggleSwitch />
        </div>
      </div>

      {/* Links : Bottom */}
      <div className="flex items-center justify-between bg-[#9b51e0] px-2 text-white md:px-28">
        {/* Left Side : User Related */}
        <div className="flex">
          <Link
            href="/bookmarks"
            className="px-2 py-[10px] text-xs font-normal hover:bg-purple-500 md:px-5 md:text-base"
          >
            Bookmarks
          </Link>
          <Link
            href="/filter"
            className="px-2 py-[10px] text-xs font-normal hover:bg-purple-500 md:px-5 md:text-base"
          >
            Filter
          </Link>
          <Link
            href="/filter/movies"
            className="px-2 py-[10px] text-xs font-normal hover:bg-purple-500 md:px-5 md:text-base"
          >
            Movies
          </Link>
        </div>
        {/* Right Side : Site Related */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => randomize()}
            className="mx-2 rounded bg-purple-800 px-3 md:px-5 py-2 md:py-1 text-xs hover:scale-105 md:text-base flex gap-1 items-center"
          >
            <p className="md:block hidden">Random</p>
            <i className="fa-solid fa-shuffle"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
