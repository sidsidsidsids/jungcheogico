import Bookmark from "./bookmark";
import CodeInfo from "./code-info";
import CodeQuiz from "./code-quiz";
interface CodeContainerProps {
  language: string;
  quizId: number;
  quiz: {
    type: string;
    language: string;
    quizid: number;
    year: number;
    session: number;
    content: string[];
    answer: string;
    keyword: string[];
    solution: {
      redline: number[];
      yellowline: number[];
      description: string;
      variables: {
        [key: string]: any;
      };
    }[];
  };
}
export default function CodeContainer({
  language,
  quizId,
  quiz,
}: CodeContainerProps) {
  let sampleIndex = 0;
  return (
    <div className="flex flex-col border-2 border-black-900 gap-2">
      <div className="flex flex-row gap-3">
        <Bookmark language={language} quizId={quizId} />
        <CodeInfo year={quiz.year} session={quiz.session} type={quiz.type} />
      </div>
      <div>
        <CodeQuiz
          content={quiz.content}
          redline={quiz.solution[sampleIndex].redline}
          yellowline={quiz.solution[sampleIndex].yellowline}
        />
      </div>
    </div>
  );
}
