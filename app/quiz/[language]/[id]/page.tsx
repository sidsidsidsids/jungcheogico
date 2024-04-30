import QuizContainer from "../../../../components/quiz/quiz-container";
interface QuizPageParams {
  params: { language: string; id: number };
}
async function fetchQuiz(language: string, id: number) {
  const res = await fetch(`${process.env.API_URI}/quiz/${language}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const json = await res.json();
  return json;
}
async function fetchComment(language: string, id: number) {
  const res = await fetch(
    `${process.env.API_URI}/comment/${language}/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const json = await res.json();
  return json;
}
export default async function QuizPage({
  params: { language, id },
}: QuizPageParams) {
  const quiz = await fetchQuiz(language, id);
  const comments = await fetchComment(language, id);

  return (
    <main className="flex min-h-screen place-items-start justify-center">
      <QuizContainer
        language={language}
        quizId={id}
        quiz={quiz}
        comments={comments}
      />
    </main>
  );
}
