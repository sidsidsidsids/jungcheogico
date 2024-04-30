"use client";

import { useState, useEffect } from "react";

interface BookmarkProps {
  language: string;
  quizId: number;
}
export default function Bookmark({ language, quizId }: BookmarkProps) {
  const [is_bookmark, set_is_bookmark] = useState(false);

  useEffect(() => {
    async function check() {
      const bookmark = await localStorage.getItem(language);
      if (bookmark) {
        const parsedBookmark = JSON.parse(bookmark);
        const isBookmark = parsedBookmark.includes(Number(quizId));
        set_is_bookmark(isBookmark);
      }
    }
    check();
  }, [language, quizId]);

  async function handleBookmark() {
    const bookmark = await localStorage.getItem(language);
    if (bookmark) {
      const parsedBookmark = JSON.parse(bookmark);
      if (is_bookmark) {
        const newBookmark = parsedBookmark.filter(
          (id: number) => id !== Number(quizId)
        );
        localStorage.setItem(language, JSON.stringify(newBookmark));
        set_is_bookmark(false);
      } else {
        parsedBookmark.push(Number(quizId));
        localStorage.setItem(language, JSON.stringify(parsedBookmark));
        set_is_bookmark(true);
      }
    } else {
      if (is_bookmark) {
        localStorage.removeItem(language);
        set_is_bookmark(false);
      } else {
        localStorage.setItem(language, JSON.stringify([Number(quizId)]));
        set_is_bookmark(true);
      }
    }
  }
  return (
    <>
      {is_bookmark === true ? (
        <div
          className="flex bg-green-600 w-12 sm:w-24 h-10 rounded-md text-center place-items-center justify-center font-noto_sans_kr font-black text-yellow-400 text-xl transition-colors duration-200 ease-in-out cursor-pointer"
          onClick={() => handleBookmark()}
        >
          ★
        </div>
      ) : (
        <div
          className="flex bg-green-500 w-12 sm:w-24 h-10 rounded-md text-center place-items-center justify-center font-noto_sans_kr font-black text-white text-xl transition-colors duration-200 ease-in-out cursor-pointer"
          onClick={() => handleBookmark()}
        >
          ★
        </div>
      )}
    </>
  );
}
