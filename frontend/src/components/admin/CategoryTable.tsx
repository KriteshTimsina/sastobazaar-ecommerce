import { Category } from "@/types";
import { Table, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export const CategoryRow = ({ category }: { category: Category }) => {
  const hasSubcategories =
    category.subCategories && category.subCategories.length > 0;

  //   const filteredSubcategories = hasSubcategories
  //     ? category?.subCategories?.filter(
  //         (subcat) => subcat.title || subcat.description
  //       )
  //     : [];

  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex gap-2 items-center px-10 ">
            <span className="font-medium">{category.title}</span>
            {hasSubcategories && (
              <Badge variant="outline" className="ml-2">
                {category.subCategories.length} subcategories
              </Badge>
            )}
          </div>
        </TableCell>
        <TableCell>{category.description}</TableCell>
        <TableCell className="text-center">{0}</TableCell>

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
                <Link href={`/products?category}`}>View Products</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {hasSubcategories && category.subCategories.length > 0 && (
        <TableRow>
          <TableCell colSpan={5} className="p-0">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value={`subcategories-${category._id}`}
                className="border-0"
              >
                <div className="pl-4">
                  <AccordionTrigger className="py-2 px-10">
                    <span className="text-sm font-medium">
                      View Subcategories
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableBody>
                        {category.subCategories.map((subcategory) => (
                          <CategoryRow
                            key={subcategory._id}
                            category={subcategory}
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
