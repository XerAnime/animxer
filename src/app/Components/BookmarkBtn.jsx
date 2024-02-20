"use client";
import { useState, useEffect } from "react";

const BookmarkBtn = ({ animeId }) => {
  const [currentBookmarks, setCurrentBookmarks] = useState([]);
  const [isBookmarked, setBookmarked] = useState(false);
  const [load, setLoad] = useState(0);

  useEffect(() => {
    setCurrentBookmarks(JSON.parse(localStorage.getItem("bookmarks")) || []);
  }, [load]);

  useEffect(() => {
    const index = currentBookmarks.indexOf(animeId);
    if (index === -1) {
      setBookmarked(false);
    } else {
      setBookmarked(true);
    }
  }, [animeId, currentBookmarks]);

  const toggleBookmark = (id) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const index = bookmarks.indexOf(id);

    if (index === -1) {
      bookmarks.push(id);
      alert("Bookmark added.");
    } else {
      bookmarks.splice(index, 1);
      alert("Bookmark removed.");
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    setLoad((prevLoad) => prevLoad + 1);
  };

  return (
    <button
      onClick={() => toggleBookmark(animeId)}
      className={`flex w-full items-center justify-center gap-1 rounded-md py-2 text-white ${
        isBookmarked
          ? "bg-purple-500 hover:bg-purple-700"
          : "bg-purple-700 hover:bg-purple-900"
      }`}
    >
      <i className="fa-regular fa-bookmark"></i>
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
};

export default BookmarkBtn;
