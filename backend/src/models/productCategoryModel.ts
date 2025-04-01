import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
});

const productCategorySchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      unique: true,
      index: true,
    },
    subCategories: [subcategorySchema],
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true }
);

export const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
