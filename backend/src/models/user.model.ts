import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
});

export const User = mongoose.model("User", userSchema);
