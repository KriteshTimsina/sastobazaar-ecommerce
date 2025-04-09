"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/data";

const images = [
  "http://localhost:8000/uploads/image-5.jpeg",
  "http://localhost:8000/uploads/image-3.jpeg",
  "http://localhost:8000/uploads/image-2.jpeg",
  "http://localhost:8000/uploads/image-4.jpeg"
];

// Generate mock reviews
const generateReviews = (rating: number) => {
  const reviews = [];
  const reviewCount = Math.floor(Math.random() * 10) + 5; // 5-15 reviews

  for (let i = 0; i < reviewCount; i++) {
    const reviewRating = Math.max(1, Math.min(5, Math.floor(rating + (Math.random() * 2 - 1))));
    reviews.push({
      id: `review-${i}`,
      author: `Customer ${i + 1}`,
      rating: reviewRating,
      date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
      title: ["Great product", "Excellent quality", "Good value", "Highly recommend", "Satisfied"][
        Math.floor(Math.random() * 5)
      ],
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    });
  }

  return reviews;
};

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const productImages = images;
  const reviews = generateReviews(product.rating);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, newQuantity)));
  };

  const handleAddToCart = () => {};

  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="container p-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div
            className="bg-background relative aspect-square overflow-hidden rounded-lg border"
            onMouseMove={handleImageZoom}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <div
              className={cn("absolute inset-0 transition-transform duration-300", isZoomed ? "scale-150" : "scale-100")}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                    }
                  : {}
              }
            >
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.discount && <Badge className="absolute left-4 top-4 z-10">{product.discount}% OFF</Badge>}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative aspect-square cursor-pointer overflow-hidden rounded-md border",
                  selectedImage === index ? "ring-primary ring-2" : ""
                )}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5"
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      color={i < Math.floor(product.rating) ? "#FFD700" : "#E5E7EB"}
                    />
                  ))}
                <span className="text-muted-foreground ml-2 text-sm">
                  {product.rating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <span className="text-muted-foreground text-sm">{product.stock} in stock</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {product.discount ? (
              <>
                <span className="text-3xl font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="text-muted-foreground text-xl line-through">${product.price.toFixed(2)}</span>
                <Badge variant="outline" className="border-green-600 text-green-600">
                  Save ${(product.price * (product.discount / 100)).toFixed(2)}
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none rounded-l-md"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex h-10 w-12 items-center justify-center text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none rounded-r-md"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <span className="text-muted-foreground text-sm">{product.stock} available</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <span className="text-muted-foreground text-sm">SKU: {product.id.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="h-auto w-full justify-start rounded-none border-b p-0">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent py-3 data-[state=active]:shadow-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent py-3 data-[state=active]:shadow-none"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-primary rounded-none border-b-2 border-transparent py-3 data-[state=active]:shadow-none"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p className="text-lg">{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <h3>Features</h3>
              <ul>
                <li>High-quality materials for durability</li>
                <li>Ergonomic design for comfort</li>
                <li>Versatile for various uses</li>
                <li>Easy to clean and maintain</li>
                <li>Modern aesthetic that complements any style</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-medium">Technical Specifications</h3>
                <div className="space-y-2">
                  {[
                    { label: "Brand", value: "NextShop" },
                    { label: "Model", value: product.name },
                    { label: "Material", value: "Premium Quality" },
                    { label: "Dimensions", value: "12 × 8 × 2 inches" },
                    { label: "Weight", value: "1.5 lbs" }
                  ].map(spec => (
                    <div key={spec.label} className="flex justify-between border-b py-2">
                      <span className="font-medium">{spec.label}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-medium">Package Contents</h3>
                <ul className="list-inside list-disc space-y-2">
                  <li>1 × {product.name}</li>
                  <li>1 × User Manual</li>
                  <li>1 × Warranty Card</li>
                  {product.category === "electronics" && <li>1 × Charging Cable</li>}
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-8">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="md:w-1/3">
                  <div className="bg-muted/50 rounded-lg p-6">
                    <div className="mb-4 text-center">
                      <span className="text-5xl font-bold">{product.rating.toFixed(1)}</span>
                      <div className="mt-2 flex justify-center">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5"
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                              color={i < Math.floor(product.rating) ? "#FFD700" : "#E5E7EB"}
                            />
                          ))}
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">Based on {reviews.length} reviews</p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = reviews.filter(r => Math.floor(r.rating) === star).length;
                        const percentage = (count / reviews.length) * 100;
                        return (
                          <div key={star} className="flex items-center">
                            <span className="w-12 text-sm">{star} stars</span>
                            <div className="bg-muted mx-2 h-2 flex-1 overflow-hidden rounded-full">
                              <div className="bg-primary h-full" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="w-12 text-right text-sm">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6">
                      <Button className="w-full">Write a Review</Button>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="mb-4 text-lg font-medium">Customer Reviews</h3>
                  <div className="space-y-6">
                    {reviews.slice(0, 3).map(review => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="mb-2 flex justify-between">
                          <h4 className="font-medium">{review.title}</h4>
                          <span className="text-muted-foreground text-sm">{review.date}</span>
                        </div>
                        <div className="mb-2 flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4"
                                fill={i < Math.floor(review.rating) ? "currentColor" : "none"}
                                color={i < Math.floor(review.rating) ? "#FFD700" : "#E5E7EB"}
                              />
                            ))}
                          <span className="ml-2 text-sm font-medium">{review.author}</span>
                        </div>
                        <p className="text-sm">{review.content}</p>
                      </div>
                    ))}
                  </div>
                  {reviews.length > 3 && (
                    <Button variant="outline" className="mt-4">
                      Load More Reviews
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map(relatedProduct => (
            <Card key={relatedProduct.id} className="group overflow-hidden">
              <Link href={`/products/${relatedProduct.id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {relatedProduct.discount && (
                    <Badge className="bg-primary absolute right-2 top-2">{relatedProduct.discount}% OFF</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center">
                    <div className="flex text-yellow-400">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4"
                            fill={i < Math.floor(relatedProduct.rating) ? "currentColor" : "none"}
                          />
                        ))}
                    </div>
                    <span className="text-muted-foreground ml-2 text-xs">{relatedProduct.rating}</span>
                  </div>
                  <h3 className="line-clamp-1 font-medium">{relatedProduct.name}</h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{relatedProduct.description}</p>
                  <div className="mt-2">
                    {relatedProduct.discount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ${(relatedProduct.price * (1 - relatedProduct.discount / 100)).toFixed(2)}
                        </span>
                        <span className="text-muted-foreground text-sm line-through">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold">${relatedProduct.price.toFixed(2)}</span>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
