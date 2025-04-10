"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/clientApi";
import { type Category } from "@/types";
import { IProductInput, productValidationSchema } from "@/types/schema";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";

type ProductFormProps = {
  categories: Category[];
};

export default function ProductForm({ categories }: ProductFormProps) {
  const router = useRouter();
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [imagesURI, setImagesURI] = useState<string[]>([]);

  const form = useForm<IProductInput>({
    resolver: zodResolver(productValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discount: 0,
      quantity: 0,
      categoryId: "",
      subCategoryId: ",",
      images: [],
      isActive: true
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (product: IProductInput) => createProduct(product),
    onSuccess: data => {
      toast.success(data.message);
      form.reset();
      router.push("/admin/products");
      router.refresh();
    },
    onError: e => {
      toast.success(e.message);
      console.log(e.message);
    }
  });

  const images = form.watch("images") || [];

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find(sub => sub._id === categoryId);
    if (category) {
      setSubCategories(category?.subCategories);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));

      setImagesURI(prev => [...prev, ...newImages]);
      const updatedImages = [...images, ...files];
      form.setValue("images", updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (images) {
      form.setValue(
        "images",
        images.filter((_, i) => i !== index)
      );
    }
    const updated = imagesURI.filter((_, i) => i !== index);
    setImagesURI(updated);
  };

  const onSubmit = (body: IProductInput) => {
    mutate(body);
    router.push("/admin/products");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Basic information about the product</CardDescription>
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
                          placeholder="Describe your product under 255 words..."
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
                <CardTitle>Product Images (1-5)</CardTitle>
                <CardDescription>Upload images of your product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <label className="hover:bg-muted/50 flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-4">
                    <Upload className="text-muted-foreground mb-2 h-8 w-8" />
                    <p className="text-muted-foreground text-center text-xs">Click to upload</p>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>

                  {imagesURI.length > 0 &&
                    imagesURI.map((image, index) => (
                      <div key={index} className="relative h-32 overflow-hidden rounded-md border">
                        <Image
                          fill
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                          <Button type="button" variant="secondary" size="sm" onClick={() => handleRemoveImage(index)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
                {imagesURI.length === 0 && (
                  <p className="text-muted-foreground mt-4 text-sm">
                    No images uploaded yet. Please upload at least one image.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Set the pricing for your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field: { ...field } }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} {...form.register("price", { valueAsNumber: true })} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          {...form.register("discount", { valueAsNumber: true })}
                        />
                      </FormControl>
                      <FormDescription>Leave at 0 for no discount</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>Assign your product to a category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <Select
                        onValueChange={value => {
                          field.onChange(value);
                          handleCategoryChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(category => (
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Sub Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subCategories.map(subCategory => (
                            <SelectItem key={subCategory._id} value={subCategory._id}>
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
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field: { ...field } }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          {...form.register("quantity", { valueAsNumber: true })}
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Status</FormLabel>
                        <FormDescription>Make this product visible on your store</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            Cancel
          </Button>
          <Button disabled={isPending} type="submit">
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
