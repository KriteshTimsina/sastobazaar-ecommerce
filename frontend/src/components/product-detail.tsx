"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type Product } from "@/types";
import { type Product as DummyProduct } from "@/lib/data";
import Pricing from "@/components/shared/pricing";

interface ProductDetailProps {
  product: Product;
  relatedProducts: DummyProduct[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(product.quantity, newQuantity)));
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
    <div className="container mx-auto p-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 ">
        <div className="flex flex-col  gap-4 md:flex-row">
          <div className="md:w-4/5">
            <div
              className="bg-background relative aspect-square overflow-hidden rounded-lg border"
              onMouseMove={handleImageZoom}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              style={{ cursor: isZoomed ? "zoom-out" : "zoom-in" }}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div
                className={cn(
                  "absolute inset-0 transition-transform duration-300",
                  isZoomed ? "scale-150" : "scale-100"
                )}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                      }
                    : {}
                }
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="md:w-1/5">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              {product.images.length > 0 &&
                product.images.map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative aspect-square cursor-pointer overflow-hidden rounded-md border",
                      selectedImage === index ? "ring-primary ring-2" : ""
                    )}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image src={image} alt={product.title} fill className="object-contain" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground mt-1 line-clamp-3 text-sm">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Pricing price={product.price} discountPercent={product.discountPercent} />
            {product.discountPercent > 0 && (
              <Badge variant="outline" className="border-green-600 text-green-600">
                {product.discountPercent} % Off
              </Badge>
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
                  disabled={quantity >= product.quantity}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <span className="text-muted-foreground text-sm">{product.quantity} available</span>
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
            <span className="text-muted-foreground text-sm">SKU: {product._id.toUpperCase()}</span>
          </div>
        </div>
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
