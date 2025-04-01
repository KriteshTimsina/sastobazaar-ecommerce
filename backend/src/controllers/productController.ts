import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel";
import { ProductCategory } from "../models/productCategoryModel";
import path from "path";
import { uploadToCloud } from "../utils/cloudinary";
import { Request } from "./user.controller";
import { User } from "../models/userModel";
import { STATUS } from "../utils/status";

export const createProduct = expressAsyncHandler(
  async (req: Request, res, next): Promise<any> => {
    const files = req.files;
    const images = [];
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

      for (const file in files) {
        const image = await uploadToCloud(files[file].path);
        if (image) {
          images.push(image);
        }
      }
      const product = await Product.create({
        description: req.body.description,
        title: req.body.title,
        price: req.body.price,
        images,
        category: category.title,
        subCategory: subCategory.title,
        quantity: req.body.quantity,
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
    const { q = "" } = req.query;
    const product = await Product.find({
      title: { $regex: String(q), $options: "i" },
    });

    if (product) {
      res
        .status(STATUS.OK)
        .json({ status: true, message: "Products found", product });
    }
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
  const { title, description, price, categoryId, subCategoryId, quantity } =
    req.body;
  const files = req.files;
  const images = [];

  // console.log(id,req.body,req.files,"PATA")
  try {
    const productExists = await Product.findById(id);

    console.log(productExists);

    if (!productExists) {
      throw new Error("Product doesn't exists.");
    }

    for (const file in files) {
      const image = await uploadToCloud(files[file].path);
      if (image) {
        images.push(image);
      }
    }

    const category = await ProductCategory.findById({ _id: categoryId });

    if (category) {
      const subCategory = category.subCategories.find(
        (sub) => sub._id.toString() === subCategoryId
      );
      if (subCategory) {
        const updateProduct = await Product.findByIdAndUpdate(
          { _id: productExists._id },
          {
            title,
            description,
            price,
            category: category.title,
            subCategory: subCategory.title,
            images,
            quantity,
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
    } else {
    }
  } catch (error: any) {
    console.log("ERE?");
    throw new Error(error.message);
  }
});

export const addToWishlist = expressAsyncHandler(async (req: Request, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    const userExists = await User.findById(_id);
    console.log(userExists);
    const alreadyAdded = userExists.wishlist.find(
      (id) => id.toString() === productId
    );

    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        userExists._id,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.json({ status: true, message: "Removed from wishlist", user });
    } else {
      let user = await User.findByIdAndUpdate(
        userExists._id,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      res.json({ status: true, message: "Added to wishlist", user });
    }
  } catch (error) {
    throw new Error(error);
  }
});
