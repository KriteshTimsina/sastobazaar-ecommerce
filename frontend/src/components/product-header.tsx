"use client";

import { FC, useState } from "react";
import { Grid, List, Search, SlidersHorizontal, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/data";
import { DisplayMode } from "@/types/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ProductHeaderProps = {
  mode: DisplayMode;
};

const ProductHeader: FC<ProductHeaderProps> = ({ mode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [displayMode, setDisplayMode] = useState<DisplayMode>(mode);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const onModeSwitch = () => {
    const updatedMode = displayMode === "grid" ? "list" : "grid";
    setDisplayMode(updatedMode);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", updatedMode);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">{`10`} products available</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8 md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
                  <h3 className="mb-4 font-medium">Categories</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.slug)}
                          onCheckedChange={checked => handleCategoryChange(category.slug, checked as boolean)}
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

                  <h3 className="mb-4 font-medium">Price Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="number" placeholder="Min" />
                    <Input type="number" placeholder="Max" />
                  </div>

                  <Separator className="my-6" />

                  <h3 className="mb-4 font-medium">Rating</h3>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                        setSelectedCategories([]);
                        setSearchQuery("");
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

            <div className="flex rounded-md border">
              <Button
                variant={displayMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={onModeSwitch}
              >
                <Grid className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant={displayMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={onModeSwitch}
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
          {selectedCategories.map(category => {
            const categoryObj = categories.find(c => c.slug === category);
            return (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {categoryObj?.name}
                <button
                  onClick={() => handleCategoryChange(category, false)}
                  className="hover:bg-muted ml-1 rounded-full p-0.5"
                >
                  ✕
                </button>
              </Badge>
            );
          })}
          {selectedCategories.length > 0 && (
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setSelectedCategories([])}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default ProductHeader;
