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

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="overflow-hidden ">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 group">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {/* {product.discount && (
          <Badge className="absolute top-2 right-2 bg-primary">
            {product.discount}% OFF
          </Badge>
        )} */}
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
        <div>
          {/* {product.discount ? (
          <div className="flex gap-2 items-center">
            <span className="text-lg font-bold">
              $
              {(product.price * (1 - product.discount / 100)).toFixed(
                2
              )}
            </span>
            <span className="text-sm line-through text-muted-foreground">
              ${product.price.toFixed(2)}
            </span>
          </div>
        ) : ( */}
          <span className="text-lg font-bold">
            Rs. {product.price.toFixed(2)}
          </span>
          {/* )} */}
        </div>
        <CartButton />
      </CardFooter>
    </Card>
  );
};
