"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { makeRequest } from "@/API/request";
import Link from "next/link";
let searchTimeout;

const SearchBox = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchedAnimes, setSearchedAnimes] = useState([]);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setSearch(value);

    // Clear any existing timeout
    clearTimeout(searchTimeout);

    // Set a new timeout for 2000 milliseconds (2 seconds)
    searchTimeout = setTimeout(() => {
      if (value !== "") {
        makeRequest(`/${value}`, { cache: "force-cache" }).then((res) =>
          setSearchedAnimes(res?.results)
        );
      } else {
        setSearchedAnimes([]);
      }
    }, 500);
  };

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        setSearchedAnimes([]);
        document.querySelector(".search-btn").click();
      }
    });
  }, []);

  return (
    <div className="search relative">
      <div className="search-box">
        <div className="search-field">
          <input
            placeholder="Search..."
            className="input color-text"
            type="text"
            value={search ? search : ""}
            onChange={handleOnChange}
          />
          <div className="search-box-icon">
            <button
              className="btn-icon-content search-btn"
              onClick={() => {
                if (search !== "") {
                  router.push(`/search/${search}`);
                  setSearch("");
                }
              }}
            >
              <i className="search-icon">
                <svg
                  xmlns="://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                </svg>
              </i>
            </button>
          </div>
        </div>
      </div>
      <main className="flex flex-col absolute w-full z-50 bg-[#121212] max-h-60 overflow-y-scroll scrollbar">
        {searchedAnimes?.map((anime, index) => (
          <Link
            key={index}
            href={`/${anime?.id}`}
            onClick={() => {
              setSearch("");
              setSearchedAnimes([]);
            }}
            className="flex items-center border-b border-[#fff3] text-left text-sm md:text-base"
          >
            <img
              src={anime?.image}
              alt={anime?.title}
              className="w-16 md:w-20 h-auto p-2 rounded-md"
            />
            <p className=" line-clamp-3 pr-3">{anime?.title}</p>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default SearchBox;
