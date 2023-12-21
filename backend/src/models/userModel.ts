import mongoose, { Mongoose, Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  role: string;
  isActive: boolean;
  wishlist:string[];
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
      select: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=626&ext=jpg&ga=GA1.1.393839023.1702357779&semt=ais",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    wishlist:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
      },
    ]
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
