"use server";
import { NextResponse, NextRequest } from "next/server";
import { getQuiz, createQuiz } from "../../../../../libs/actions/quiz.action";
import { Quiz } from "../../../../../libs/models/quiz.model";
import connectDB from "../../../../../libs/connect-db";
import { createErrorResponse } from "../../../../../libs/utils";
interface QuizPageParams {
  params: { language: string; id: number };
}

export async function GET(
  request: NextRequest,
  { params: { language, id } }: QuizPageParams
) {
  try {
    await connectDB();
    const quiz = await Quiz.findOne({ language: language, quizid: id });
    if (!quiz) {
      return createErrorResponse("quiz not found", 404);
    }
    return NextResponse.json(quiz, { status: 200 });
  } catch (error) {
    return createErrorResponse("failure", 500);
  }
}
// export async function POST(request: NextRequest) {
//   try {
//     const quiz = await createQuiz();
//     console.log(quiz);
//     return NextResponse.json(quiz, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
