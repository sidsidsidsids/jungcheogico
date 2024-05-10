import type { Metadata } from "next";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});
const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto_sans_kr",
});

export const metadata: Metadata = {
  title: "정보처리기사 코딩 문제 솔루션 정처기코",
  description: "정보처리기사 필기 실기 기출 유사 문제 모음",
  verification: {
    google: "guQCftdu30zlgxl75BY6MUhML3d7lYtkgtjZFXFTjSA",
    other: {
      "naver-site-verification": "89848067fb1a63e6932fd7885f025ec737b472de",
    },
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${noto_sans_kr.variable}`}>
      <body>{children}</body>
      <GoogleAnalytics
        gaId={
          process.env.NEXT_PUBLIC_GA_ID ? process.env.NEXT_PUBLIC_GA_ID : ""
        }
      />
    </html>
  );
}
