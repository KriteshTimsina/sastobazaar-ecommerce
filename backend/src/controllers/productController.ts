import expressAsyncHandler from "express-async-handler";
import { Product } from "../models/productModel";
import { ProductCategory } from "../models/productCategoryModel";
import { uploadToCloud } from "../utils/cloudinary";
import { type Request } from "./user.controller";
import { User } from "../models/userModel";
import { STATUS } from "../utils/status";
import { type IProduct, productValidationSchema } from "../types/schemas";
import { z } from "zod";
import { type FilterQuery } from "mongoose";
import { IMAGE_BASE_URL } from "../utils/env";
import { deleteProductImage } from "../services/product.services";
import { slugify } from "../utils/slugify";
import { getDiscountPercent } from "../utils/calculation";

export const createProduct = expressAsyncHandler(async (req: Request, res, next): Promise<any> => {
  const files = req.files;
  const { title, description, price, quantity, categoryId, subCategoryId, discount, isActive } = req.body;
  const images: string[] = [];

  try {
    const data = {
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      categoryId,
      subCategoryId,
      discount: Number(discount ?? 0),
      isActive: Boolean(isActive) ?? 0,
      images: []
    };

    const validatedData = productValidationSchema.parse(data);

    const category = await ProductCategory.findById(validatedData.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const subCategory = category.subCategories.find(sub => sub._id.toString() === validatedData.subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    for (const file in files) {
      const image: string = files[file].filename;
      images.push(image);
    }

    const slug = slugify(validatedData.title);

    const product = await Product.create({
      description: validatedData.description,
      title: validatedData.title,
      price: validatedData.price,
      categoryId: category._id,
      subCategoryId: subCategory._id,
      quantity: validatedData.quantity,
      discount: validatedData.discount,
      isActive: validatedData.isActive,
      images,
      slug
    });

    res.json({
      status: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400);
      return res.json({
        status: false,
        message: "Validation failed",
        errors: error.errors
      });
    }
    next(error);
  }
});

export const getAllProduct = expressAsyncHandler(async (req: Request, res) => {
  try {
    const { q = "" } = req.query;
    const isAdmin = (req?.user && req?.user?.role === "admin") || false;

    const queryObject: FilterQuery<IProduct> = {
      title: { $regex: String(q), $options: "i" }
    };

    if (!isAdmin) {
      queryObject.isActive = true;
    }

    const products = await Product.find(queryObject);
    const transformedProducts = [];
    if (products) {
      for (const product of products) {
        const category = await ProductCategory.findById(product.categoryId);

        if (!category) {
          transformedProducts.push({
            ...product.toObject(),
            category: "Unknown",
            subCategory: "Unknown"
          });
          continue;
        }

        const subCategory = category.subCategories.id(product.subCategoryId);

        const imageURLs = [];

        product.images.forEach((url: any) => {
          if (url) {
            const imageURL = `${IMAGE_BASE_URL}${url}`;
            imageURLs.push(imageURL);
          }
        });

        const discountPercent = getDiscountPercent(product.discount, product.price);

        transformedProducts.push({
          ...product.toObject(),
          category: category.title,
          subCategory: subCategory ? subCategory.title : "Unknown",
          categoryId: undefined,
          subCategoryId: undefined,
          __v: undefined,
          isActive: isAdmin ? product.isActive : undefined,
          images: imageURLs,
          discountPercent
        });
      }
      res.status(STATUS.OK).json({
        status: true,
        message: "Products found",
        data: transformedProducts
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

export const getSingleProduct = expressAsyncHandler(async (req: Request, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug });
    if (!product) {
      res.status(STATUS.NOT_FOUND).json({
        status: false,
        data: null,
        message: "Product doesn't exists"
      });
    }

    const discountPercent = getDiscountPercent(product.discount, product.price);

    const imageURLs = [];

    product.images.forEach((url: any) => {
      if (url) {
        const imageURL = `${IMAGE_BASE_URL}${url}`;
        imageURLs.push(imageURL);
      }
    });

    res.status(STATUS.OK).json({
      status: true,
      message: "Product found",
      data: { ...product.toObject(), images: imageURLs, discountPercent }
    });
    throw new Error("Failed to get product");
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        message: error.message,
        status: false
      });
    }
  }
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      throw new Error("No product found");
    }
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      throw new Error("Error deleting product");
    }

    product.images?.length > 0 &&
      product.images?.forEach((image: any) => {
        const deleted = deleteProductImage(image as string);
        console.log(deleted, "Images");
      });

    res.json({
      status: true,
      message: "Product Deleted successfully",
      product
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, categoryId, subCategoryId, quantity } = req.body;
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
      const subCategory = category.subCategories.find(sub => sub._id.toString() === subCategoryId);
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
            quantity
          },
          {
            new: true
          }
        );
        res.json({
          status: true,
          message: "Product updated successfully",
          updateProduct
        });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});

export const addToWishlist = expressAsyncHandler(async (req: Request, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    const userExists = await User.findById(_id);
    console.log(userExists);
    const alreadyAdded = userExists.wishlist.find(id => id.toString() === productId);

    if (alreadyAdded) {
      const user = await User.findByIdAndUpdate(
        userExists._id,
        {
          $pull: { wishlist: productId }
        },
        {
          new: true
        }
      );
      res.json({ status: true, message: "Removed from wishlist", user });
    } else {
      const user = await User.findByIdAndUpdate(
        userExists._id,
        {
          $push: { wishlist: productId }
        },
        {
          new: true
        }
      );
      res.json({ status: true, message: "Added to wishlist", user });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
});
