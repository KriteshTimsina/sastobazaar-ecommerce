import { Response } from "express";
import { IUser, User } from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/jwt";

import { Request as ExpressRequest } from "express";
import path from "path";
import { uploadToCloud } from "../utils/cloudinary";

export interface Request extends ExpressRequest {
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
        const user = await User.create({
          username,
          email,
          password,
        });
        const token = generateToken(user._id);

        res.json({
          status: true,
          message: "User Registered Successfully",
          user: {
            token,
            userId: user._id,
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
      const user = await User.findOne({ email }).select("+password").exec();
      if (user) {
        const isPasswordMatched = await user.checkForPasswordMatch(password);
        if (isPasswordMatched) {
          const token = generateToken(user._id);
          if (token) {
            res.json({
              status: true,
              message: "Login successfully",
              user: {
                token,
                userId: user._id,
              },
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
      const user = await User.findById(req.user._id);
      if (user) {
        res.status(201).json({
          status: true,
          message: "User info found",
          user,
        });
      }
      throw new Error("User not found");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const user = await User.find();
  if (user) {
    res.json({ status: true, user });
  }
});

export const editUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.body;
    const { path } = req.file;
    console.log(path);
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        throw new Error("User not found");
      }
      const image = await uploadToCloud(path);
      if (image) {
        const updatedUser = await User.findByIdAndUpdate(
          req?.user._id,
          { username, avatar: image ?? user.avatar },
          { new: true }
        );

        if (updatedUser) {
          res.json({
            status: true,
            message: "User info updated successfully",
            updatedUser,
          });
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const blockUser = expressAsyncHandler(async (req: Request, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );

    if (user) {
      res.json({ status: true, message: "User blocked successfully" });
    }
    throw new Error("Error blocking user");
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const unblockUser = expressAsyncHandler(async (req: Request, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        isActive: true,
      },
      { new: true }
    );

    if (user) {
      res.json({ status: true, message: "User unblocked successfully" });
    }
    throw new Error("Error unblocking user");
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const changePassword = expressAsyncHandler(async (req: Request, res) => {
  try {
    const { newPassword, oldPassword } = req.body;

    const user = await User.findById(req.user._id).select("password");

    if (!user) {
      throw new Error("User not found. Please login or signup");
    }
    const isPasswordMatched = await user.checkForPasswordMatch(oldPassword);

    if (isPasswordMatched) {
      user.password = newPassword;
      await user.save();
      res
        .status(200)
        .json({ status: true, message: "password changed successfully" });
    } else throw new Error("Old password is incorrect");
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const getUserWishlists = expressAsyncHandler(async(req:Request,res)=>{
  try {
    const {_id} = req.user
    const user = await User.findById(_id).populate("wishlist")

    if(!user){
      throw new Error("User not found. Login")

    }
    res.json({
      status:true,
      message:"Products Wishlist found",
      wishlists:user.wishlist
    })

      } catch (error) {
    throw new Error(error)
  }
})
