import {
  ModelOptions,
  Severity,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@ModelOptions({
  schemaOptions: {
    collection: "quiz",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class QuizClass {
  @prop({ required: true })
  type: string;

  @prop({ required: true })
  language!: string;

  @prop({ required: true })
  quizid!: number;

  @prop({ required: true })
  year!: number;

  @prop({ required: true })
  session!: number;

  @prop({ required: true })
  content!: string[];

  @prop()
  options?: string[];

  @prop({ required: true })
  answer!: string;

  @prop()
  keyword?: string[];

  @prop()
  solution?: {
    redline: number[];
    yellowline: number[];
    description: string;
    variables: any;
  };

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Quiz = getModelForClass(QuizClass);
export { Quiz, QuizClass };
