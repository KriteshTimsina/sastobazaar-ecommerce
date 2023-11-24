import { Request, Response } from "express";
import { User } from "../models/user.model";
import expressAsyncHandler from "express-async-handler";

export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        throw new Error("User already exist.");
      }
      const user = await User.create({ username, email, password });
      res.json({ user });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
