"use client";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Product } from "@/types";
import StockAvailabilityStatus from "@/components/admin/StockAvailabilityStatus";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProduct } from "@/lib/clientApi";

type ProductTableProps = {
  product: Product;
};

export const ProductTable: FC<ProductTableProps> = ({ product }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: data => {
      toast.success(data.message);
      setSelectedProductId(null);
      router.refresh();
    },
    onError: e => {
      toast.success(e.message);
      console.log(e.message);
    }
  });

  const handleDeleteClick = (productId: string) => {
    setSelectedProductId(productId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProductId) {
      mutate(selectedProductId);
    }
    setDeleteDialogOpen(false);
    setSelectedProductId(null);
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
            <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
          </div>
        </TableCell>
        <TableCell className="max-w-[300px] truncate font-medium">{product.title}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell className="text-right">Rs. {product.price.toFixed(2)}</TableCell>
        <TableCell className="text-center">{product.quantity}</TableCell>
        <TableCell className="text-center">
          <StockAvailabilityStatus quantity={product.quantity} />
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/admin/products/${product._id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={() => handleDeleteClick(product._id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the product from your store.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button disabled={isPending} variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
