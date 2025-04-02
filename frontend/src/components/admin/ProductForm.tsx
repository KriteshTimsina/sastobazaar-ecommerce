"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { IProductInput, productValidationSchema } from "@/types/schema";
import { type Category } from "@/types";
import Image from "next/image";

type ProductFormProps = {
  categories: Category[];
};

export default function ProductForm({ categories }: ProductFormProps) {
  const router = useRouter();
  const [subCategories, setSubCategories] = useState<Category[]>([]);

  const form = useForm<IProductInput>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      categoryId: "",
      subCategoryId: "",
      discountedPrice: 0,
      images: [],
      isActive: true,
    },
  });

  const images = form.watch("images") || [];

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find((sub) => sub._id === categoryId);
    if (category) {
      setSubCategories(category?.subCategories);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      const updatedImages = [...images, ...newImages];
      form.setValue("images", updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    form.setValue(
      "images",
      images.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: IProductInput) => {
    console.log(data);

    return;

    alert("Product created successfully!");
    router.push("/admin/products");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column - General Information & Media */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Basic information about the product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Macbook Air" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your product..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Media</CardTitle>
                <CardDescription>Upload images of your product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex flex-col justify-center items-center p-4 h-32 rounded-md border-2 border-dashed cursor-pointer hover:bg-muted/50">
                    <Upload className="mb-2 w-8 h-8 text-muted-foreground" />
                    <p className="text-xs text-center text-muted-foreground">
                      Click to upload or
                      <br />
                      drag and drop
                    </p>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="overflow-hidden relative h-32 rounded-md border"
                    >
                      <Image
                        fill
                        src={image || "/placeholder.svg"}
                        alt={`Product image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <div className="flex absolute inset-0 flex-col gap-1 justify-center items-center opacity-0 transition-opacity bg-black/40 hover:opacity-100">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRemoveImage(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {images.length === 0 && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No images uploaded yet. Please upload at least one image.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Pricing, Category, Inventory */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>
                  Set the pricing for your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Base Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountedPrice"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Discounted Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Leave at 0 for no discount
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>
                  Assign your product to a category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleCategoryChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  disabled={!subCategories.length}
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a sub-category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subCategories.map((subCategory) => (
                            <SelectItem
                              key={subCategory._id}
                              value={subCategory._id}
                            >
                              {subCategory.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. MAC-AIR-M2" {...field} />
                      </FormControl>
                      <FormDescription>
                        Stock Keeping Unit - unique identifier for your product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 123456789012" {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional - enter the product barcode if available
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field: { onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) => onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-between items-center p-4 rounded-lg border">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Status
                        </FormLabel>
                        <FormDescription>
                          Make this product visible on your store
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </Form>
  );
}
