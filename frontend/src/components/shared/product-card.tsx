import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { type Product } from "@/types";
import CartButton from "@/components/shared/cart-button";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/shared/pricing";
import Link from "next/link";
import { getDiscountedPercent } from "@/utils/getDiscountedPercent";

export const ProductCard = ({ product }: { product: Product }) => {
  const discountPercentage = getDiscountedPercent(product.price, product.discountedPrice);
  const image = product.images[0] ?? "";
  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="p-0">
        <div className="group relative h-48 w-full">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={image}
              alt={product.title}
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          {product.discountedPrice > 0 && (
            <Badge className="bg-primary absolute left-2 top-3">{discountPercentage}% OFF</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Link className="line-clamp-1 font-medium" href={`/products/${product.slug}`}>
          {product.title}
        </Link>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Pricing price={product.price} discountedPrice={product.discountedPrice} />
        <CartButton />
      </CardFooter>
    </Card>
  );
};
