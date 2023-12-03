import expressAsyncHandler from "express-async-handler";
import { Post } from "../models/post.model";
import { Request } from "./user.controller";

export const createPost = expressAsyncHandler(async (req: Request, res) => {
  try {
    if (req.user) {
    }
    const post = await Post.create({
      userId: req?.user?.id,
      description: req.body.description,
      title: req.body.title,
    });
    res.json({ status: true, message: "Post added successfully", post });
  } catch (error: any) {
    throw new Error(error.message);
  }
});
