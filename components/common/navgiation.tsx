"use client";
import Logo from "./logo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { userStore } from "../../libs/store";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isMobile, setIsMobile] = useState(false);
  const {
    c_list,
    java_list,
    python_list,
    c_list_init,
    java_list_init,
    python_list_init,
    quizIndex_zero,
  } = userStore((state) => state);
  const path = usePathname();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  let c_path;
  let java_path;
  let python_path;
  if (c_list.length > 0) {
    c_path = c_list[0];
  } else {
    c_path = getRandomNumber(5);
    c_list_init(c_path);
  }
  if (java_list.length > 0) {
    java_path = java_list[0];
  } else {
    java_path = getRandomNumber(3);
    java_list_init(java_path);
  }
  if (python_list.length > 0) {
    python_path = python_list[0];
  } else {
    python_path = getRandomNumber(2);
    python_list_init(python_path);
  }
  function getRandomNumber(quizLength: number): number {
    const randomNumber = Math.floor(Math.random() * quizLength) + 1;
    return randomNumber;
  }
  if (isMobile) {
    return (
      <div className="flex justify-center mt-2">
        <Logo />
      </div>
    );
  }
  return (
    <div className="z-10">
      <div className="absolute w-32 mt-3 ml-8">
        <Logo />
      </div>
      <nav className="flex bg-transparent shadow-md justify-center">
        <div className="max-w-7xl">
          <div className="flex justify-between items-center h-20 space-x-24">
            <ul className="flex space-x-8">
              <li className="nav-item">
                {path[6] === "c" ? (
                  <div className="flex w-24 h-16 rounded-lg bg-slate-200 place-items-center justify-center">
                    <Image
                      src={`/c_lang.png`}
                      alt="C"
                      width="0"
                      height="0"
                      sizes="100vw"
                      priority
                      className="h-14 w-auto"
                    />
                  </div>
                ) : (
                  <Link href={`/quiz/c/${c_path}`}>
                    <div
                      className="flex w-24 h-16 rounded-lg place-items-center justify-center transition-colors duration-200 ease-in-out hover:bg-slate-100"
                      onClick={() => quizIndex_zero()}
                    >
                      <Image
                        src={`/c_lang.png`}
                        alt="C"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority
                        className="h-14 w-auto"
                      />
                    </div>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {path[6] === "j" ? (
                  <div className="flex w-24 h-16 rounded-lg bg-slate-200 place-items-center justify-center">
                    <Image
                      src={`/java_lang.png`}
                      alt="C"
                      width="0"
                      height="0"
                      sizes="100vw"
                      priority
                      className="h-14 w-auto"
                    />
                  </div>
                ) : (
                  <Link href={`/quiz/java/${java_path}`}>
                    <div
                      className="flex w-24 h-16 rounded-lg place-items-center justify-center transition-colors duration-200 ease-in-out hover:bg-slate-100"
                      onClick={() => quizIndex_zero()}
                    >
                      <Image
                        src={`/java_lang.png`}
                        alt="C"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority
                        className="h-14 w-auto"
                      />
                    </div>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {path[6] === "p" ? (
                  <div className="flex w-24 h-16 rounded-lg bg-slate-200 place-items-center justify-center">
                    <Image
                      src={`/python_lang.png`}
                      alt="C"
                      width="0"
                      height="0"
                      sizes="100vw"
                      priority
                      className="h-14 w-auto"
                    />
                  </div>
                ) : (
                  <Link href={`/quiz/python/${python_path}`}>
                    <div
                      className="flex w-24 h-16 rounded-lg place-items-center justify-center transition-colors duration-200 ease-in-out hover:bg-slate-100"
                      onClick={() => quizIndex_zero()}
                    >
                      <Image
                        src={`/python_lang.png`}
                        alt="C"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority
                        className="h-14 w-auto"
                      />
                    </div>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
