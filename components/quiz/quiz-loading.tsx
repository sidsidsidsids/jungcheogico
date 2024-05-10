"use client";
import { useState, useEffect } from "react";
export default function QuizLoading() {
  const [text, setText] = useState("문제를 불러오고 있습니다");
  useEffect(() => {
    const interval = setInterval(() => {
      const dotCount = (text.match(/\./g) || []).length;

      if (dotCount >= 3) {
        setText("문제를 불러오고 있습니다");
      } else {
        setText((prevText) => prevText + ".");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <div className="flex min-h-screen place-items-center justify-center xs:text-2xl sm:text-3xl lg:text-5xl font-noto_sans_kr font-black">
      {text}
    </div>
  );
}
