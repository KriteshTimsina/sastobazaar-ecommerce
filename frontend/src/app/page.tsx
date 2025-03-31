import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import productFallbackImage from "@/assets/images/product-fallback.png";
import { getAllProducts } from "@/app/actions/product";

import banner from "@/assets/images/banner.jpg";

export default async function Home() {
  const products = await getAllProducts();
  console.log(products, "P");

  return (
    <div className="flex flex-col gap-10 pb-10 mx-auto">
      {/* Hero Banner */}
      <section className="relative h-[500px] w-full ">
        <Image src={banner} alt="Hero Banner" fill className="object-cover" />
        <div className="flex absolute inset-0 items-center px-10 bg-black/40">
          <div className="container">
            <div className="max-w-lg text-white">
              <h1 className="mb-4 text-4xl font-bold">
                Summer Collection 2024
              </h1>
              <p className="mb-6 text-lg">
                Discover our latest products with amazing discounts up to 50%
                off.
              </p>
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      {/* <section className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link
            href="/categories"
            className="flex items-center text-sm font-medium text-primary"
          >
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="md:basis-1/3 lg:basis-1/5"
              >
                <Link href={`/products?category=${category.slug}`}>
                  <div className="overflow-hidden relative h-40 rounded-lg group">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="flex absolute inset-0 justify-center items-center bg-black/30">
                      <h3 className="text-lg font-medium text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-center text-muted-foreground">
                    {category.productCount} Products
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section> */}

      {/* Featured Products */}
      <section className="container px-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="flex items-center text-sm font-medium text-primary"
          >
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={productFallbackImage}
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
                <Button size="icon" variant="outline">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
