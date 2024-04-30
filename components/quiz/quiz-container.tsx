"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Bookmark from "./bookmark";
import CodeInfo from "./code-info";
import CodeQuiz from "./code-quiz";
import ErrorToast from "../common/error-toast";
import SuccessToast from "../common/success-toast";
import { userStore } from "../../libs/store";
import randomNickname from "./randomNickname";

interface QuizContainerParams {
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
    options: string;
    keyword: string[];
    solution: {
      redline: number[];
      yellowline: number[];
      description: string;
      variables: {
        [key: string]: any;
      };
    }[];
    question: string;
  };
  comments: {
    _id: string;
    writer: string;
    date: string;
    content: string;
    language: string;
    quizid: number;
  }[];
}

async function createComment(
  language: string,
  id: number,
  writer: string,
  password: string,
  content: string,
  date: Date
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/comment/${language}/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        quizid: id,
        writer: writer,
        password: password,
        content: content,
        date: date,
      }),
    }
  );
  const json = await res.json();
  return json;
}

async function deleteComment(language: string, quizid: number, id: any) {
  const userInput = prompt("해당 댓글의 비밀번호를 입력해주세요 (4~8자리)");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/comment/${language}/${quizid}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        password: userInput,
      }),
    }
  );
  const json = await res.json();
  return json;
}

export default function QuizContainer({
  language,
  quizId,
  quiz,
  comments,
}: QuizContainerParams) {
  const [open_answer, set_open_answer] = useState(false);
  const [open_solution, set_open_solution] = useState(false);
  const [open_comment, set_open_comment] = useState(false);
  const [solution_index, set_solution_index] = useState(0);
  const [prev_num, set_prev_num] = useState(1);
  const [next_num, set_next_num] = useState(1);
  const solutionLength = quiz.solution.length;
  const {
    c_list,
    java_list,
    python_list,
    quizIndex,
    quizLength,
    use_bookmark,
    quizIndex_up,
    quizIndex_down,
    set_quizLength,
  } = userStore();
  const [cur_comment, set_cur_comment] = useState(comments);
  const [writer, set_writer] = useState(randomNickname());
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [msg, set_msg] = useState("");
  const [isErr, setErr] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    async function initData() {
      if (use_bookmark === false) {
        if (language === "c") {
          if (quizIndex !== 0) {
            set_prev_num(c_list[quizIndex - 1]);
          }
          if (quizIndex !== quizLength - 1) {
            set_next_num(c_list[quizIndex + 1]);
          }
          set_quizLength(5);
        }
        if (language === "java") {
          if (quizIndex !== 0) {
            set_prev_num(java_list[quizIndex - 1]);
          }
          if (quizIndex !== quizLength - 1) {
            set_next_num(java_list[quizIndex + 1]);
          }
          set_quizLength(3);
        }
        if (language === "python") {
          if (quizIndex !== 0) {
            set_prev_num(python_list[quizIndex - 1]);
          }
          if (quizIndex !== quizLength - 1) {
            set_next_num(python_list[quizIndex + 1]);
          }
          set_quizLength(2);
        }
      } else {
        const bookmarkArray = await localStorage.getItem(language);
        if (bookmarkArray) {
          const parsedBookmark = JSON.parse(bookmarkArray);
          set_quizLength(parsedBookmark.length);
          if (quizIndex !== 0) {
            set_prev_num(parsedBookmark[quizIndex - 1]);
          }
          if (quizIndex !== quizLength - 1) {
            set_next_num(parsedBookmark[quizIndex + 1]);
          }
        }
      }
    }
    initData();

    async function getWriter() {
      const nickname = await localStorage.getItem("nickname");
      if (nickname && nickname.length > 0) {
        set_writer(nickname);
      }
    }
    getWriter();
  }, [language, quizId]);

  const variablesToString = (variables: { [key: string]: any }) => {
    return Object.entries(variables)
      .map(([key, value]) => `${key}: ${value}\n`)
      .join("");
  };

  async function writeComment() {
    if (!contentRef.current || contentRef.current.value.length < 1) {
      set_msg("댓글 내용을 입력해주세요");
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
      return;
    }
    if (writer === undefined || writer.length < 2) {
      set_msg("닉네임을 2~11자 입력해주세요");
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
      return;
    }
    if (writer.includes("운영자")) {
      set_msg("닉네임으로 '운영자'는 사용할 수 없습니다.");
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
      return;
    }
    if (!passwordRef.current || passwordRef.current.value.length < 4) {
      set_msg("비밀번호를 4~8자 입력해주세요");
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
      return;
    }
    const date = new Date(Date.now() + 32400000);

    const result = await createComment(
      language,
      Number(quizId),
      writer,
      passwordRef.current.value,
      contentRef.current.value,
      date
    );
    if (result.status === "fail" || result.status === "error") {
      set_msg("댓글 작성에 실패했습니다");
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
      return;
    } else {
      await localStorage.setItem("nickname", writer);
      const new_comment = {
        _id: result.comment._id,
        writer: result.comment.writer,
        content: result.comment.content,
        date: result.comment.date,
        language: language,
        quizid: quizId,
      };

      const updated_comment = [...cur_comment, new_comment];

      set_cur_comment(updated_comment);
      contentRef.current.value = "";
      passwordRef.current.value = "";
      set_msg("댓글 작성 성공");
      setErr(false);
      setSuccess(true);
      set_open_comment(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }

  async function removeComment(language: string, quizid: number, id: any) {
    const result = await deleteComment(language, quizid, id);
    if (result.status === "fail" || result.status === "error") {
      set_msg("비밀번호가 일치하지 않습니다");
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 3000);
      return;
    } else {
      const newComments = await cur_comment.filter((obj) => obj._id !== id);
      set_cur_comment(newComments);
      set_msg("댓글 삭제 성공");
      setErr(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-center p-12 gap-1 xl:gap-14">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-3">
              <Bookmark language={language} quizId={quizId} />
              <CodeInfo question={quiz.question} />
            </div>
            <div>
              {open_solution === false ? (
                <CodeQuiz content={quiz.content} />
              ) : (
                <CodeQuiz
                  content={quiz.content}
                  redline={quiz.solution[solution_index].redline}
                  yellowline={quiz.solution[solution_index].yellowline}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-72 sm:w-122 flex-col">
          {open_solution === false ? (
            <>
              {open_answer === false ? (
                <>
                  <div className="flex w-72 sm:w-122 justify-between">
                    <div
                      className="flex w-40 sm:w-60 h-10 bg-blue-500 rounded-md place-items-center justify-center text-white font-noto_sans_kr font-bold cursor-pointer transition-colors duration-50 ease-in-out hover:bg-blue-600"
                      onClick={() => {
                        set_open_solution(true);
                        set_open_comment(true);
                      }}
                    >
                      솔루션 보기
                    </div>
                    <div className="flex w-40 sm:w-60 h-10 bg-zinc-400 rounded-md place-items-center justify-center text-xs md:text-sm font-noto_sans_kr font-bold p-2">
                      {quiz.year}-{quiz.session}회 {quiz.type} 유사 문제
                    </div>
                  </div>
                  <div
                    className="flex w-72 sm:w-full h-24 mt-2 bg-cyan-500 rounded-md place-items-center justify-center text-white font-noto_sans_kr font-bold cursor-pointer transition-colors duration-50 ease-in-out hover:bg-cyan-600"
                    onClick={() => {
                      set_open_answer(true);
                      set_open_comment(true);
                    }}
                  >
                    답 보기
                  </div>
                </>
              ) : (
                <>
                  <div className="flex w-72 sm:w-122 justify-between">
                    <div
                      className="flex w-40 sm:w-60 h-10 bg-blue-500 rounded-md place-items-center justify-center text-white font-noto_sans_kr font-bold cursor-pointer transition-colors duration-50 ease-in-out hover:bg-blue-600"
                      onClick={() => {
                        set_open_solution(true);
                        set_open_comment(true);
                      }}
                    >
                      솔루션 보기
                    </div>
                    <div className="flex w-40 sm:w-60 h-10 bg-zinc-200 rounded-md place-items-center justify-start text-xs md:text-sm font-noto_sans_kr font-bold p-2">
                      키워드 : {quiz.keyword.join(", ")}
                    </div>
                  </div>
                  <div className="flex w-72 sm:w-full mt-2 h-24 border-2 bg-slate-50 rounded-md place-items-center text-sm justify-start font-noto_sans_kr font-bold p-2">
                    {quiz.answer}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div className="flex w-72 sm:w-122 justify-between">
                {solution_index === 0 ? (
                  <div
                    className="flex w-40 sm:w-60 h-10 bg-slate-800 border-2 border-slate-800 rounded-md place-items-center justify-center text-white text-xs font-noto_sans_kr font-bold transition-colors duration-100 ease-in-out hover:bg-slate-900"
                    onClick={() => {
                      set_open_solution(false);
                      set_open_answer(false);
                      set_solution_index(0);
                    }}
                  >
                    첫 페이지입니다 (돌아가기)
                  </div>
                ) : (
                  <div
                    className="flex w-40 sm:w-60 h-10 bg-slate-100 border-2 border-slate-800 rounded-md place-items-center justify-center font-noto_sans_kr font-bold cursor-pointer transition-colors duration-30 ease-in-out hover:bg-slate-200"
                    onClick={() => set_solution_index(solution_index - 1)}
                  >
                    ◀ 이전
                  </div>
                )}
                {solution_index === solutionLength - 1 ? (
                  <div
                    className="flex w-40 sm:w-60 h-10 bg-slate-800 border-2 border-slate-800 rounded-md place-items-center justify-center text-white text-xs font-noto_sans_kr font-bold transition-colors duration-100 ease-in-out hover:bg-slate-900"
                    onClick={() => {
                      set_open_solution(false);
                      set_open_answer(false);
                      set_solution_index(0);
                    }}
                  >
                    마지막 페이지입니다 (돌아가기)
                  </div>
                ) : (
                  <div
                    className="flex w-40 sm:w-60 h-10 bg-slate-100 border-2 border-slate-800 rounded-md place-items-center justify-center font-noto_sans_kr font-bold cursor-pointer transition-colors duration-30 ease-in-out hover:bg-slate-200"
                    onClick={() => set_solution_index(solution_index + 1)}
                  >
                    다음 ▶
                  </div>
                )}
              </div>
              <div className="flex whitespace-pre w-72 sm:w-full mt-2 min-h-24 h-auto border-2 bg-slate-50 rounded-md place-items-center text-sm justify-start font-noto_sans_kr font-bold p-2">
                {quiz.solution[solution_index].variables
                  ? variablesToString(quiz.solution[solution_index].variables)
                  : ""}
              </div>
            </>
          )}
          {open_solution === false ? (
            <textarea
              name="memo"
              id="memo"
              className="block w-72 sm:w-full h-32 rounded-md mt-1 border-2 border-black-900 align-center p-2 text-black text-sm placeholder:text-gray-400"
              placeholder={
                quiz.options.length > 0
                  ? quiz.options
                  : "메모하며 답을 작성해보세요. 솔루션은 해당 창에서 출력됩니다."
              }
            />
          ) : (
            <div className="block w-72 sm:w-122 h-32 rounded-md bg-slate-50 border-2 border-black-900 align-center p-2 text-black break-words font-noto_sans_kr overflow-y-auto">
              {quiz.solution[solution_index].description}
            </div>
          )}
          <div className="flex w-72 sm:w-122 justify-between mt-2">
            {quizIndex === 0 ? (
              <div className="flex w-36 sm:w-60 h-10 bg-slate-500 rounded-md place-items-center justify-center text-white font-noto_sans_kr font-bold disabled">
                첫 문제입니다
              </div>
            ) : (
              <Link href={`/quiz/${language}/${prev_num}`}>
                <div
                  className="flex w-36 sm:w-60 h-10 bg-indigo-500 rounded-md place-items-center justify-center text-white font-noto_sans_kr font-bold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-600"
                  onClick={() => quizIndex_down()}
                >
                  이전 문제
                </div>
              </Link>
            )}
            {quizIndex === quizLength - 1 ? (
              <div className="flex w-36 sm:w-60 h-10 bg-slate-500 rounded-md place-items-center justify-center text-white font-noto_sans_kr font-bold disabled">
                마지막 문제입니다
              </div>
            ) : (
              <Link href={`/quiz/${language}/${next_num}`}>
                <div
                  className="flex w-36 sm:w-60 h-10 bg-indigo-500 rounded-md place-items-center justify-center text-white font-noto_sans_kr font-bold cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-600"
                  onClick={() => quizIndex_up()}
                >
                  다음 문제
                </div>
              </Link>
            )}
          </div>
          {cur_comment.length > 0 ? (
            open_comment ? (
              <div className="flex flex-col w-72 sm:w-122 mt-2">
                {cur_comment.map((comment, index) => (
                  <div key={comment._id} className="relative m-1">
                    <div className="flex flex-row w-72 sm:w-122 gap-2 place-items-end">
                      <span className="text-md font-noto_sans_kr font-medium">
                        {comment.writer}
                      </span>
                      <span className="text-xs text-slate-500 font-noto_sans_kr">
                        {comment.date.slice(2, 10)}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                    <div
                      className="absolute bottom-5 right-2 font-black font-roboto text-red-600 cursor-pointer"
                      onClick={() => {
                        removeComment(
                          comment.language,
                          comment.quizid,
                          comment._id
                        );
                      }}
                    >
                      X
                    </div>
                    <div className="h-0.5 bg-slate-200 m-1 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-72 sm:w-122 text-slate-500 text-center font-noto_sans_kr mt-2">
                답 혹은 솔루션 확인 후 댓글을 확인할 수 있습니다
              </div>
            )
          ) : (
            <>
              <p className="text-slate-500 text-center font-noto_sans_kr mt-2">
                작성된 댓글이 없습니다
              </p>
              <div className="h-0.5 bg-slate-200 m-1 rounded-xl" />
            </>
          )}
          <>
            <div className="flex w-72 sm:w-122 flex-col">
              <textarea
                className="font-noto_sans_kr rounded-md border-2 mt-2 p-2 text-md"
                ref={contentRef}
                placeholder="내용과 무관한 댓글은 삭제될 수 있습니다"
                minLength={1}
                maxLength={200}
                required
              />
              <div className="flex w-72 sm:w-122 flex-row">
                <input
                  className="mt-1 w-28 sm:w-40 font-noto_sans_kr text-center border-2 text-md"
                  value={writer}
                  onChange={(e) => set_writer(e.target.value)}
                  type="text"
                  placeholder="닉네임을 입력해주세요 (4-11자)"
                  minLength={2}
                  maxLength={11}
                  required
                />
                <input
                  className="mt-1 w-28 sm:w-40 ml-1 font-noto_sans_kr text-xs sm:text-sm text-center border-2"
                  ref={passwordRef}
                  type="password"
                  placeholder="비밀번호를 입력해주세요 (4-8자)"
                  minLength={4}
                  maxLength={8}
                  required
                />
                <button
                  type="submit"
                  className="w-full mt-1 ml-1 rounded-md border-2 border-purple-400 bg-purple-500 font-noto_sans_kr text-white text-bold transition-colors duration-200 ease-in-out hover:border-purple-600"
                  onClick={() => writeComment()}
                >
                  작성
                </button>
              </div>
            </div>
            {isErr && <ErrorToast message={msg} />}
            {isSuccess && <SuccessToast message={msg} />}
          </>
        </div>
      </div>
    </>
  );
}
