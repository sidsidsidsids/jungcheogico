import type { Metadata } from "next";
import Navigation from "../../../../components/common/navgiation";
import QuizLoading from "../../../../components/quiz/quiz-loading";
import { Suspense } from "react";
import "../../../globals.css";

export const metadata: Metadata = {
  title: "문제 풀이",
  description: "정보처리기사 C 자바 파이썬",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navigation />
      <Suspense fallback={<QuizLoading />}>{children}</Suspense>
    </section>
  );
}
