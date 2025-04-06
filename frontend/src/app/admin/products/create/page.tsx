import { getAllCategories } from '@/app/actions/product';
import ProductForm from '@/components/admin/ProductForm';
import React from 'react';

export default async function CreateProduct() {
  const categories = await getAllCategories();
  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Product</h1>
        <p className="text-muted-foreground">Add a new product to your inventory</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
