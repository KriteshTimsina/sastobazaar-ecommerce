import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel";
// import { Request } from "./user.controller";
import { Request } from "express";
import { ProductCategory } from "../models/productCategoryModel";
import path from "path";
import { ProductDocument } from "../models/productModel";

export const createProduct = expressAsyncHandler(
  async (req: any, res, next): Promise<any> => {
    const image = req.file.path;
    try {
      const category = await ProductCategory.findById(req.body.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const subCategory = category.subCategories.find(
        (sub) => sub._id.toString() === req.body.subCategoryId
      );
      if (!subCategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
      const product = await Product.create({
        description: req.body.description,
        title: req.body.title,
        price: req.body.price,
        image,
        category: category.title,
        subCategory: subCategory.name,
      });
      res.json({
        status: true,
        message: "Product created successfully",
        product,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const getAllProduct = expressAsyncHandler(async (req: Request, res) => {
  try {
    const product = await Product.find();
    if (product) {
      res.json({ status: true, message: "Products found", product });
    }
    // const image = path.join(__dirname, `../../${product.image}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const getSingleProduct = expressAsyncHandler(
  async (req: Request, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (product) {
        res.json({ status: true, message: "Product found", product });
      }
      throw new Error("Failed to get product");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      throw new Error("No product found");
    }
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new Product("Error deleting product");
    }

    res.json({
      status: true,
      message: "Product Deleted successfully",
      product,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, categoryId, subCategoryId } = req.body;
  console.log(req.body);
  try {
    const productExists = await Product.findById(id);

    if (!productExists) {
      throw new Error("Product doesn't exists.");
    }

    const category = await ProductCategory.findById({ _id: categoryId });

    if (category) {
      const subCategory = category.subCategories.find(
        (sub) => sub._id.toString() === subCategoryId
      );
      if (subCategory) {
        const updateProduct = await Product.findByIdAndUpdate(
          { _id: id },
          {
            title,
            description,
            price,
            category: category.title,
            subCategory: subCategory.name,
          },
          {
            new: true,
          }
        );
        res.json({
          status: true,
          message: "Product updated successfully",
          updateProduct,
        });
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
});
