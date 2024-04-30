interface CodeInfoProps {
  question: string;
}

export default function CodeInfo({ question }: CodeInfoProps) {
  return (
    <div className="flex bg-slate-200 w-56 sm:w-96 h-10 p-2 rounded-md place-items-center font-noto_sans_kr font-bold">
      {question}
    </div>
  );
}
