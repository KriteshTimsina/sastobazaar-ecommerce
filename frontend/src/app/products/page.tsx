"use client"

import { useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Grid, List, Search, ShoppingBag, SlidersHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { categories, products } from "@/lib/data"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter products based on search query and selected categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    return matchesSearch && matchesCategory
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "rating":
        return b.rating - a.rating
      default:
        return a.featured ? -1 : 1
    }
  })

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">{sortedProducts.length} products available</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <h3 className="font-medium mb-4">Categories</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.slug)}
                            onCheckedChange={(checked) => handleCategoryChange(category.slug, checked as boolean)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <h3 className="font-medium mb-4">Price Range</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Input type="number" placeholder="Min" />
                      <Input type="number" placeholder="Max" />
                    </div>

                    <Separator className="my-6" />

                    <h3 className="font-medium mb-4">Rating</h3>
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating}`} />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                          >
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 text-yellow-400"
                                  fill={i < rating ? "currentColor" : "none"}
                                />
                              ))}
                            <span className="ml-1">& Up</span>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCategories([])
                          setSearchQuery("")
                        }}
                      >
                        Reset
                      </Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Separator orientation="vertical" />
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => {
              const categoryObj = categories.find((c) => c.slug === category)
              return (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {categoryObj?.name}
                  <button
                    onClick={() => handleCategoryChange(category, false)}
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    ✕
                  </button>
                </Badge>
              )
            })}
            {selectedCategories.length > 0 && (
              <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setSelectedCategories([])}>
                Clear all
              </Button>
            )}
          </div>
        )}

        {/* Products */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
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
        ) : (
          <div className="space-y-4">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-48 sm:h-auto sm:w-48 shrink-0">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-primary">{product.discount}% OFF</Badge>
                    )}
                  </div>
                  <div className="flex flex-col p-4 flex-1">
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
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        {product.discount ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">
                              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

