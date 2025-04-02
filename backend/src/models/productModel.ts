import mongoose, { Mongoose, Schema, Document, Model } from "mongoose";
import { IProduct } from "../types/schemas";

const productSchema = new Schema<IProduct & Document>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      default: 0,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      required: [true, "Upload an image"],
    },
    categoryId: {
      type: String,
      required: true,
      ref: "ProductCategory",
    },
    subCategoryId: {
      type: String,
      required: true,
      ref: "ProductCategory.subCategories",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
