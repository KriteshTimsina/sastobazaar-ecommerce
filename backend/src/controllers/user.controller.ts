import { Response } from "express";
import { IUser, User } from "../models/user.model";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/jwt";

import { Request as ExpressRequest } from "express";

interface Request extends ExpressRequest {
  user?: IUser;
}

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

export const login = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const isPasswordMatched = await user.checkForPasswordMatch(password);
        if (isPasswordMatched) {
          const token = generateToken(user._id);
          if (token) {
            res.json({
              status: true,
              message: "Login successfully",
              email: user.email,
              username: user.username,
              token,
            });
          } else throw new Error("Errror logging in user.");
        } else throw new Error("Invalid Password");
      } else throw new Error("User doesn't exists");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const getUserInfo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      res.json({
        status: true,
        message: "User info found",
        user: req.user,
      });
    } catch (error: any) {
      throw new Error("HI" + error.message);
    }
  }
);
