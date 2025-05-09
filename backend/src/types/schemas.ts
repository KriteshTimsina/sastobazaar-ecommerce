import { z } from "zod";
import { File } from "buffer";

export const productValidationSchema = z
  .object({
    title: z
      .string({ message: "Title is required" })
      .min(3, "Title must be atleast 3 charaters")
      .max(255, "Title must not exceed 255 character"),
    description: z
      .string({ message: "Description is required" })
      .min(3, "Description is required and be atleast 3 charaters")
      .max(255, "Description must not exceed 255 character"),
    price: z.number({ message: "Price is required" }).max(9999999, "Price cannot be greater than 9999999"),
    discount: z.number().max(9999999, "Discount cannot be greater than 9999999").optional().default(0),
    images: z.union([z.array(z.instanceof(File)).max(3, "Maximum 3 images allowed"), z.array(z.string()).max(3)]),
    categoryId: z
      .string({ message: "Select a category" })
      .length(24, "Invalid ID: Must be exactly 24 characters")
      .regex(/^[a-fA-F0-9]{24}$/, "Invalid Category ID"),
    subCategoryId: z
      .string({ message: "Select a sub category" })
      .length(24, "Invalid ID: Must be exactly 24 characters")
      .regex(/^[a-fA-F0-9]{24}$/, "Invalid sub category ID"),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .int("Quantity must be an integer")
      .nonnegative("Quantity must be greater than zero"),
    isActive: z.boolean().default(true),
    slug: z.string().optional()
  })
  .refine(data => data.discount <= data.price, {
    message: "Discount amount cannot be greater than the Original Price",
    path: ["discount"]
  });

export type IProduct = z.infer<typeof productValidationSchema>;
