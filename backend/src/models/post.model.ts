import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
