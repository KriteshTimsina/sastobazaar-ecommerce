import { getAllProducts } from '@/app/actions/product';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ProductCard } from '@/components/shared/product-card';

const Products = async () => {
  const products = await getAllProducts();

  return (
    <section className="container px-10 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link href="/products" className="flex items-center text-sm font-medium text-primary">
          View All <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default Products;
