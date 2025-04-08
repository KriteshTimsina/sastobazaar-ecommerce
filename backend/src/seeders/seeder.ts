import connectDB from "../db";

import { categoryData, productsData } from "./data";
import { ProductCategory } from "../models/productCategoryModel";
import { Product } from "../models/productModel";
import { slugify } from "../utils/slugify";

// import

export const seedDatabase = async () => {
  try {
    const categories = await ProductCategory.insertMany(categoryData);
    if (categories) {
      const productRequest = productsData.map(product => {
        const random = Math.floor(Math.random() * 2);
        return {
          ...product,
          categoryId: categories[0]._id,
          subCategoryId: categories[0]?.subCategories[0]._id,
          isActive: Boolean(random),
          slug: slugify(product.title)
        };
      });

      const products = await Product.insertMany(productRequest);
      console.log(`Added ${categories?.length} categories && Added ${products?.length} products`);
    }
  } catch (error) {
    console.log("Error seeding db. 🌱", error);
  } finally {
    process.exit();
  }
};

export const destoryDb = async () => {
  try {
    await ProductCategory.deleteMany();
    await Product.deleteMany();
    console.log("Destroyed");
  } catch (error) {
  } finally {
    process.exit();
  }
};

if (process.argv[2] === "-d") {
  console.log("Destorying");
  connectDB().then(() => {
    destoryDb();
  });
} else {
  connectDB().then(() => {
    seedDatabase();
  });
  console.log("b");
}
