import {
  ModelOptions,
  Severity,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import mongoose from "mongoose";

@ModelOptions({
  schemaOptions: {
    collection: "comment",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
class CommentClass {
  @prop({ required: true })
  language!: string;

  @prop({ required: true })
  quizid!: number;

  @prop({ required: true })
  writer!: string;

  @prop({ required: true })
  date!: Date;

  @prop({ required: true })
  content!: string;

  @prop({ required: true })
  password!: string;

  _id: mongoose.Types.ObjectId | string;

  id: string;
}

const Comment = getModelForClass(CommentClass);

export { Comment, CommentClass };
