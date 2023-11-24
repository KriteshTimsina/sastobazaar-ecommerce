import { Request, Response } from "express";
import { User } from "../models/user.model";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken";

export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (!existingUser) {
        const user = await User.create({ username, email, password });
        const token = generateToken(user._id);

        res.json({
          status: true,
          message: "User Registered Successfully",
          user: {
            _id: user?._id,
            username: user?.username,
            email: user?.email,
            token,
          },
        });
      } else {
        throw new Error("User already exist.");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
export const deleteAllUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      await User.deleteMany({});
      res.json({ message: "Users deleted", status: true });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
