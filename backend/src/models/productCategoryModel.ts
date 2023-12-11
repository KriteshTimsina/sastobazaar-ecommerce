import mongoose, { Schema } from "mongoose";

const productCategorySchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);


export const ProductCategory = mongoose.model("ProductCategory",productCategorySchema)