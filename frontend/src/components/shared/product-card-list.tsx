import React, { FC } from "react";
import Image from "next/image";
import { Badge } from "lucide-react";

import { Card, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import Pricing from "@/components/shared/pricing";
import CartButton from "./cart-button";
import { getDiscountedPercent } from "@/utils/getDiscountedPercent";
import Link from "next/link";

type ProductCardListProps = {
  product: Product;
};

const ProductCardList: FC<ProductCardListProps> = ({ product }) => {
  const discountPercentage = getDiscountedPercent(product.price, product.discountedPrice);
  return (
    <Card key={product._id} className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 shrink-0 sm:h-auto sm:w-48">
          <Link href={`/products/${product.slug}`}>
            <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
          </Link>
          {product.discountedPrice && (
            <Badge className="bg-primary absolute left-2 top-0">{discountPercentage}% OFF</Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          {/* <div className="mb-2 flex items-center">
            <div className="flex text-yellow-400">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill={i < Math.floor(4) ? "currentColor" : "none"} />
                ))}
            </div>
            <span className="text-muted-foreground ml-2 text-xs">{4}</span>
          </div> */}
          <Link className="font-medium" href={`/products/${product.slug}`}>
            {product.title}
          </Link>
          <p className="text-muted-foreground mb-4 mt-1 text-sm">{product.description}</p>
          <CardFooter className="flex items-center justify-between px-0 pt-0">
            <Pricing price={product.price} discountedPrice={product.discountedPrice} />
            <CartButton />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ProductCardList;
