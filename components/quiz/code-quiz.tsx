interface CodeQuizProps {
  content: string[];
  redline?: number[];
  yellowline?: number[];
}
export default function CodeQuiz({
  content,
  redline = [],
  yellowline = [],
}: CodeQuizProps) {
  return (
    <div className="w-72 sm:w-full border-2 mb-1">
      {content.map((code, index) => (
        <div
          key={index}
          className={`${
            redline.includes(index)
              ? "bg-red-300 transition-colors duration-50"
              : yellowline.includes(index)
              ? "bg-yellow-200 transition-colors duration-500"
              : index % 2 === 0
              ? "bg-slate-100"
              : "bg-slate-50"
          }`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {code}
        </div>
      ))}
    </div>
  );
}
