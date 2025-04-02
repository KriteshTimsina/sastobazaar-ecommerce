import expressAsyncHandler from "express-async-handler";
import { verifyToken } from "../utils/jwt";
import { User } from "../models/userModel";
import { Request as ExpressRequest } from "express";
import { IUser } from "../models/userModel"; // Import your IUser interface

interface Request extends ExpressRequest {
  user: any;
}

export const authenticated = expressAsyncHandler(
  async (req: Request, _, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req?.headers?.authorization?.split(" ")[1];
      try {
        if (token) {
          const decoded = verifyToken(token);
          if (typeof decoded === "object" && "id" in decoded) {
            const foundUser = await User.findById(decoded.id);

            req.user = foundUser;
            next();
          }
        }
      } catch (error) {
        throw new Error("Token is expired, please login");
      }
    } else {
      throw new Error("Unauthorized. You cannot perform this action");
    }
  }
);

export const optionalAuth = expressAsyncHandler(
  async (req: Request, _, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req?.headers?.authorization?.split(" ")[1];
      try {
        if (token) {
          const decoded = verifyToken(token);
          if (typeof decoded === "object" && "id" in decoded) {
            const foundUser = await User.findById(decoded.id);

            req.user = foundUser;
            next();
          }
        }
      } catch (error) {
        next();
      }
    } else {
      next();
    }
  }
);
