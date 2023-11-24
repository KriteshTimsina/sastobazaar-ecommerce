import { NextFunction } from "express";
import mongoose, { Mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";
interface IUser {
  username: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 6);
  next();
});

export const User = mongoose.model("User", userSchema);
