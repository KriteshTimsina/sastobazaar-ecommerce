import mongoose, { Mongoose, Schema, Document, Model } from "mongoose";

export interface ProductDocument {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category:any,
  subCategory:any
}

const productSchema = new Schema<ProductDocument>(
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
    image: {
      type: String,
      required:[true,"Upload an image"],
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgKYKpb7CsZpzmzL6F-751Bacm0WZ3FjzAFZIBqkFjwg&s",
    },
    category:{
      type:String,
      required:true,
      ref:"ProductCategory"
    },
    subCategory:{
      type:String,
      required:true,
      ref:"ProductCategory.subCategories"
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
