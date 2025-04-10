import { z } from "zod";

export const productValidationSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .min(3, "Title must be atleast 3 charaters")
      .max(255, "Title must not exceed 255 character"),
    description: z
      .string({ required_error: "Description is required" })
      .min(3, "Description is required and be atleast 3 charaters")
      .max(255, "Description must not exceed 255 character"),
    price: z
      .number({ required_error: "Price is required" })
      .nonnegative("Price cannot be negative")
      .max(9999999, "Price cannot be greater than 9999999"),
    discount: z
      .number()
      .nonnegative("Discount cannot be negative")
      .max(9999999, "Discount cannot be greater than 9999999")
      .default(0),
    images: z.array(z.instanceof(File)).max(3, "Maximum 3 images allowed"),
    categoryId: z
      .string({ required_error: "Select a category" })
      .length(24, "Invalid ID: Must be exactly 24 characters")
      .regex(/^[a-fA-F0-9]{24}$/, "Invalid Category ID"),
    subCategoryId: z
      .string({ required_error: "Select a sub category" })
      .length(24, "Invalid ID: Must be exactly 24 characters")
      .regex(/^[a-fA-F0-9]{24}$/, "Invalid sub category ID"),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .int("Quantity must be an integer")
      .nonnegative("Quantity cannot be negative"),
    isActive: z.boolean().default(true)
  })
  .refine(data => data.discount <= data.price, {
    message: "Discount cannot be greater than the original Price",
    path: ["discount"]
  });

export type IProductInput = z.infer<typeof productValidationSchema>;
