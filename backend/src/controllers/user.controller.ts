import { Response } from "express";
import { IUser, User } from "../models/user.model";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/jwt";

import { Request as ExpressRequest } from "express";
import path from "path";

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
          user:{
            token,
            userId:user._id
          }
          
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
                userId:user._id
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
      if (req.user) {
      //  const avatar = path.join(__dirname, `../../${req.user.avatar}`); 
      //  req.user.avatar = avatar
        res.json({
          status: true,
          message: "User info found",
          user: req.user,
        });
      }
      throw new Error("Not authenticated");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
export const editUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const {username} = req.body;
    const avatar = req.file.path;
    try {
      if (req.user) {
         const imageUrl = path.join(__dirname, `../../${avatar}`); 
      const updatedUser = await User.findByIdAndUpdate(req?.user._id,{username,avatar:imageUrl},{new:true})
    
        if(updatedUser){
          res.json({
            status: true,
            message: "User info updated successfully",
            updatedUser
          });
        // }
        // else throw new Error("Error updating user")
        
      }
      else throw new Error("Error updating user")
    }
      throw new Error("Not authenticated");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);


