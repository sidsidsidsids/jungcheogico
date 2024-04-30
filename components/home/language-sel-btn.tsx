import Image from "next/image";
import Link from "next/link";
import { userStore } from "../../libs/store";

interface LanguageButtonProps {
  language: string;
  quizId: number;
  bookmarkId: number;
}

export default function LanguageButton({
  language,
  quizId,
  bookmarkId,
}: LanguageButtonProps) {
  const { quizIndex_zero, use_bookmark_true } = userStore();
  return (
    <div className="relative">
      <Link href={`quiz/${language}/${quizId}`}>
        <div
          className="flex flex-col size-40 sm:size-80 bg-slate-100 border-4 border-slate-100 rounded-lg place-items-center justify-center transition-colors duration-200 ease-in-out hover:bg-slate-50"
          onClick={() => quizIndex_zero()}
        >
          <Image
            src={`/${language}_lang.png`}
            alt={language}
            width="0"
            height="0"
            sizes="100vw"
            priority
            className="w-16 sm:w-32 h-auto"
          />
        </div>
      </Link>
      {bookmarkId !== -1 ? (
        <Link href={`quiz/${language}/${bookmarkId}`}>
          <div
            className="absolute bottom-0 right-0 bg-green-400 w-20 sm:w-24 h-6 sm:h-8 border-2 border-slate-100 rounded-lg text-center text-white text-xs sm:text-base font-noto_sans_kr transition-colors duration-200 ease-in-out hover:bg-green-600"
            onClick={() => {
              quizIndex_zero();
              use_bookmark_true();
            }}
          >
            내 즐겨찾기
          </div>
        </Link>
      ) : (
        <div className="absolute bottom-0 right-0 bg-slate-400 w-20 sm:w-24 h-6 sm:h-8 border-2 border-slate-100 rounded-lg text-center text-white text-xs sm:text-base font-noto_sans_kr">
          내 즐겨찾기
        </div>
      )}
    </div>
  );
}
