"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/lib/data";
import productFallback from "@/assets/images/product-fallback.png";

// Extended category type with subcategories
type ExtendedCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories?: ExtendedCategory[];
};

// Create nested category structure
const createNestedCategories = (): ExtendedCategory[] => {
  // Main categories
  const mainCategories: ExtendedCategory[] = [
    {
      ...categories[0], // Electronics
      subcategories: [
        {
          id: "1-1",
          name: "Smartphones",
          slug: "smartphones",
          description: "Latest smartphones and accessories",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 15,
        },
        {
          id: "1-2",
          name: "Laptops",
          slug: "laptops",
          description: "Powerful laptops for work and gaming",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 12,
          subcategories: [
            {
              id: "1-2-1",
              name: "Gaming Laptops",
              slug: "gaming-laptops",
              description: "High-performance laptops for gaming",
              image: "/placeholder.svg?height=200&width=200",
              productCount: 5,
            },
            {
              id: "1-2-2",
              name: "Business Laptops",
              slug: "business-laptops",
              description: "Reliable laptops for professional use",
              image: "/placeholder.svg?height=200&width=200",
              productCount: 7,
            },
          ],
        },
        {
          id: "1-3",
          name: "Audio",
          slug: "audio",
          description: "Headphones, speakers, and audio accessories",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 8,
        },
      ],
    },
    {
      ...categories[1], // Clothing
      subcategories: [
        {
          id: "2-1",
          name: "Men's Clothing",
          slug: "mens-clothing",
          description: "Clothing for men",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 20,
        },
        {
          id: "2-2",
          name: "Women's Clothing",
          slug: "womens-clothing",
          description: "Clothing for women",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 25,
        },
        {
          id: "2-3",
          name: "Accessories",
          slug: "accessories",
          description: "Fashion accessories",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 11,
        },
      ],
    },
    {
      ...categories[2], // Home & Kitchen
      subcategories: [
        {
          id: "3-1",
          name: "Kitchen Appliances",
          slug: "kitchen-appliances",
          description: "Appliances for your kitchen",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 18,
        },
        {
          id: "3-2",
          name: "Furniture",
          slug: "furniture",
          description: "Furniture for your home",
          image: "/placeholder.svg?height=200&width=200",
          productCount: 12,
        },
      ],
    },
    {
      ...categories[3], // Beauty
    },
    {
      ...categories[4], // Sports
    },
  ];

  return mainCategories;
};

// Recursive component to render category rows with nested subcategories
const CategoryRow = ({
  category,
  level = 0,
  searchQuery = "",
}: {
  category: ExtendedCategory;
  level?: number;
  searchQuery?: string;
}) => {
  const hasSubcategories =
    category.subcategories && category.subcategories.length > 0;
  const paddingLeft = `${level * 1.5}rem`;

  // Filter subcategories based on search query
  const filteredSubcategories = hasSubcategories
    ? category?.subcategories?.filter(
        (subcat) =>
          subcat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subcat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // If this category doesn't match the search and has no matching subcategories, don't render
  if (
    searchQuery &&
    !category.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !category.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
    filteredSubcategories?.length === 0
  ) {
    return null;
  }

  return (
    <>
      <TableRow>
        <TableCell style={{ paddingLeft }}>
          <div className="flex gap-2 items-center">
            <div className="overflow-hidden relative w-8 h-8 rounded-md">
              <Image
                src={productFallback}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium">{category.name}</span>
            {hasSubcategories && (
              <Badge variant="outline" className="ml-2">
                {filteredSubcategories.length} subcategories
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell>{category.description}</TableCell>
        <TableCell className="text-center">{category.productCount}</TableCell>
        <TableCell className="text-center">
          <Badge variant="outline">{category.slug}</Badge>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/products?category=${category.slug}`}>
                  View Products
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {hasSubcategories && filteredSubcategories.length > 0 && (
        <TableRow>
          <TableCell colSpan={5} className="p-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value={`subcategories-${category.id}`}
                className="border-0"
              >
                <div className="pl-4">
                  <AccordionTrigger className="py-2">
                    <span className="text-sm font-medium">
                      View Subcategories
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableBody>
                        {filteredSubcategories.map((subcategory) => (
                          <CategoryRow
                            key={subcategory.id}
                            category={subcategory}
                            level={level + 1}
                            searchQuery={searchQuery}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </div>
              </AccordionItem>
            </Accordion>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default function CategoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const nestedCategories = createNestedCategories();

  return (
    <div className="container py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">
              Browse our product categories
            </p>
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search categories..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Products</TableHead>
                <TableHead className="text-center">Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nestedCategories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  searchQuery={searchQuery}
                />
              ))}

              {nestedCategories.filter(
                (category) =>
                  category.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  category.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  (category.subcategories &&
                    category.subcategories.some(
                      (subcat) =>
                        subcat.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        subcat.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    ))
              ).length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
