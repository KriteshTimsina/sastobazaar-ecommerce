import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/product.model";
import { Request } from "./user.controller";

export const createProduct = expressAsyncHandler(async (req: Request, res) => {
  const image = req.file.path;
  try {
    const product = await Product.create({
      description: req.body.description,
      title: req.body.title,
      price: req.body.price,
      image,
    });
    res.json({
      status: true,
      message: "Product created successfully",
      product,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const getAllProduct = expressAsyncHandler(async (req: Request, res) => {
  try {
    const product = await Product.find();
    res.json({ status: true, message: "Products found", product });
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const getSingleProduct = expressAsyncHandler(
  async (req: Request, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      console.log(product)
      if (product) {
        res.json({ status: true, message: "Product found", product });
      } else {
        throw new Error("Failed to get product");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
