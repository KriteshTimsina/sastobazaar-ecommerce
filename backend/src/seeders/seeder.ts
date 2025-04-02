import { categoryData, productsData } from "./data";
import { ProductCategory } from "../models/productCategoryModel";
import connectDB from "../db";
import { Product } from "../models/productModel";

export const seedDatabase = async () => {
  try {
    const categories = await ProductCategory.insertMany(categoryData);
    if (categories) {
      const productRequest = productsData.map((product) => {
        const random = Math.floor(Math.random() * 2);
        return {
          ...product,
          categoryId: categories[0]._id,
          subCategoryId: categories[0]?.subCategories[0]._id,
          isActive: Boolean(random),
        };
      });

      const products = await Product.insertMany(productRequest);
      console.log(
        `Added ${categories?.length} categories && Added ${products?.length} products`
      );
    }
  } catch (error) {
    console.log("Error seeding db. 🌱", error);
  } finally {
    process.exit();
  }
};

export const destoryDb = async () => {
  try {
    const deletedCategory = await ProductCategory.deleteMany();
    const deletedProduct = await Product.deleteMany();
    console.log(deletedCategory, "HEHE", deletedProduct);
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
