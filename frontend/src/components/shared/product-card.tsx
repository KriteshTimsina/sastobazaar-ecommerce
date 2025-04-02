import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type Product } from "@/types";
import CartButton from "@/components/shared/cart-button";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/shared/pricing";

export const ProductCard = ({ product }: { product: Product }) => {
  const discountPercentage = Math.ceil(
    (product.discountedPrice / product.price) * 100
  );
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 group">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.discountedPrice && (
            <Badge className="absolute top-0 left-2 bg-primary">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {/* <div className="flex items-center mb-2">
        <div className="flex text-yellow-400">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4"
                fill={
                  i < Math.floor(product.rating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
        </div>
        <span className="ml-2 text-xs text-muted-foreground">
          {product.rating}
        </span>
      </div> */}
        <h3 className="font-medium line-clamp-1">{product.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <Pricing
          price={product.price}
          discountedPrice={product.discountedPrice}
        />
        <CartButton />
      </CardFooter>
    </Card>
  );
};
