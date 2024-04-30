import { Metadata } from "next";
import Logo from "../components/common/logo";

export const metadata: Metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col gap-16 min-h-screen place-items-center justify-center xs:text-2xl sm:text-3xl lg:text-5xl font-noto_sans_kr font-black">
      <Logo />
      <div>404 - 페이지를 찾을 수 없습니다</div>
    </div>
  );
}
