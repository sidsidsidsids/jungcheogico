"use client";
import { useEffect, useState } from "react";
import LanguageButton from "./language-sel-btn";
import { userStore } from "../../libs/store";

export default function ButtonsContainer() {
  const [is_updated, set_is_updated] = useState(false);
  const [c_bookmark, set_c_bookmark] = useState([-1]);
  const [java_bookmark, set_java_bookmark] = useState([-1]);
  const [python_bookmark, set_python_bookmark] = useState([-1]);
  const {
    c_list,
    c_list_init,
    java_list,
    java_list_init,
    python_list,
    python_list_init,
    use_bookmark_false,
  } = userStore((state) => state);

  function getList() {
    c_list_init();
    java_list_init();
    python_list_init();
  }

  async function getBookMark() {
    const c_bookmark = await localStorage.getItem("c");
    const java_bookmark = await localStorage.getItem("java");
    const python_bookmark = await localStorage.getItem("python");

    if (c_bookmark && JSON.parse(c_bookmark).length > 0) {
      const newBookmark = shuffleArray(JSON.parse(c_bookmark));
      set_c_bookmark(newBookmark);
    }
    if (java_bookmark && JSON.parse(java_bookmark).length > 0) {
      const newBookmark = shuffleArray(JSON.parse(java_bookmark));
      set_java_bookmark(newBookmark);
    }
    if (python_bookmark && JSON.parse(python_bookmark).length > 0) {
      const newBookmark = shuffleArray(JSON.parse(python_bookmark));
      set_python_bookmark(newBookmark);
    }
  }

  function shuffleArray(array: number[]) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  useEffect(() => {
    if (!is_updated) {
      getList();
      getBookMark();
      use_bookmark_false();
      set_is_updated(true);
    }
  }, [is_updated]);

  return (
    <div className="flex flex-col xl:flex-row gap-8 p-12">
      <LanguageButton
        language="c"
        quizId={c_list[0]}
        bookmarkId={c_bookmark[0]}
      />
      <LanguageButton
        language="java"
        quizId={java_list[0]}
        bookmarkId={java_bookmark[0]}
      />
      <LanguageButton
        language="python"
        quizId={python_list[0]}
        bookmarkId={python_bookmark[0]}
      />
    </div>
  );
}
