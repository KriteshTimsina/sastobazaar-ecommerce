import mongoose, { Mongoose, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  checkForPasswordMatch: (t: string) => Promise<boolean>;
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

userSchema.methods.checkForPasswordMatch = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
