import mongoose, { Mongoose, Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: string;
  isActive:boolean;
  checkForPasswordMatch: any;
}


const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select:false
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["user","admin"],
      default:"user",
    },
    avatar: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
    },
    isActive:{
      type:Boolean,
      default:true
    }
  },

  { timestamps: true }
);

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
