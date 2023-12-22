import mongoose, { Mongoose, Schema, Document, Model } from "mongoose";

export interface ProductDocument {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category:string;
  subCategory:string;
  quantity:number;
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
    images: {
      type: [],
      required:[true,"Upload an image"],
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
    quantity:{
      type:Number,
      default:1
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model<ProductDocument>(
  "Product",
  productSchema
);
