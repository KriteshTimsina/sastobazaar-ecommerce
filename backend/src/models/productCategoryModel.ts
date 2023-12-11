import mongoose, { Schema } from "mongoose";

const subcategorySchema = new Schema({
  name:{
    type:String, 
    required:true
  }
})

const productCategorySchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      unique: true,
      index: true,
    },
    subCategories:[subcategorySchema]
  },
  { timestamps: true }
);


export const ProductCategory = mongoose.model("ProductCategory",productCategorySchema)