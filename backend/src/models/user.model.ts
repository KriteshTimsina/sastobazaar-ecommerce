import mongoose, { Mongoose, Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  username: string;
  password: string;
  email: string;
  checkForPasswordMatch: (t: string) => Promise<boolean>;
}

// export interface IUserModel extends IUser, Model<IUser> {}

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

userSchema.methods.checkForPasswordMatch = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
