"use server";
import { NextResponse, NextRequest } from "next/server";
import {
  getComment,
  postComment,
  deleteComment,
} from "../../../../../libs/actions/comment.action";
import { Comment } from "../../../../../libs/models/comment.model";
import connectDB from "../../../../../libs/connect-db";
import {
  createErrorResponse,
  stringToObjectId,
} from "../../../../../libs/utils";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

interface QuizPageParams {
  params: { language: string; id: number };
}

const scrypt = promisify(_scrypt);

export async function GET(
  request: NextRequest,
  { params: { language, id } }: QuizPageParams
) {
  try {
    await connectDB();
    const comments = await Comment.find(
      { language: language, quizid: id },
      { password: 0 }
    ).sort({ date: 1 });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    return createErrorResponse("failure", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const salt = randomBytes(4).toString("hex");
    const hash = (await scrypt(body.password, salt, 16)) as Buffer;
    const encryptedPassword = salt + "." + hash.toString("hex");
    const comment = await Comment.create({
      language: body.language,
      quizid: Number(body.quizid),
      writer: body.writer,
      password: encryptedPassword,
      content: body.content,
      date: body.date,
    });
    return NextResponse.json({ comment, status: 200 });
  } catch (error) {
    return createErrorResponse("Failure", 400);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsedId = stringToObjectId(body._id);
    if (!parsedId) {
      return createErrorResponse("Invalid Comment ID", 400);
    }
    const comment = await Comment.findById(parsedId);
    if (!comment) {
      return createErrorResponse("Cannot Find Comment", 400);
    }
    const [salt, storedHash] = comment.password.split(".");
    const hash = (await scrypt(body.password, salt, 16)) as Buffer;
    if (storedHash !== hash.toString("hex")) {
      return createErrorResponse("Invalid Password", 400);
    }
    const result = await Comment.findByIdAndDelete(parsedId);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return createErrorResponse("Failure", 400);
  }
}
