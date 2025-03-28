import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { categories, getFeaturedProducts, products } from "@/lib/data"

export default function Home() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Hero Banner */}
      <section className="relative h-[500px] w-full">
        <Image src="/placeholder.svg?height=500&width=1200" alt="Hero Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container">
            <div className="max-w-lg text-white">
              <h1 className="text-4xl font-bold mb-4">Summer Collection 2024</h1>
              <p className="text-lg mb-6">Discover our latest products with amazing discounts up to 50% off.</p>
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link href="/categories" className="text-sm font-medium text-primary flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/3 lg:basis-1/5">
                <Link href={`/products?category=${category.slug}`}>
                  <div className="relative h-40 rounded-lg overflow-hidden group">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <h3 className="text-white font-medium text-lg">{category.name}</h3>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-sm text-muted-foreground">{category.productCount} Products</p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-primary flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-primary">{product.discount}% OFF</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4"
                          fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        />
                      ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">{product.rating}</span>
                </div>
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div>
                  {product.discount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <Button size="icon" variant="outline">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="sr-only">Add to cart</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Bento Grid Products */}
      <section className="container">
        <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 md:row-span-2">
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden group">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Featured Product"
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <Badge className="w-fit mb-2">New Arrival</Badge>
                <h3 className="text-2xl font-bold text-white mb-2">Premium Wireless Earbuds</h3>
                <p className="text-white/80 mb-4">Experience crystal clear sound with our latest wireless earbuds.</p>
                <Button asChild className="w-fit">
                  <Link href="/products/1">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
          {products.slice(0, 3).map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <span className="font-bold">${product.price.toFixed(2)}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted py-16">
        <div className="container text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

