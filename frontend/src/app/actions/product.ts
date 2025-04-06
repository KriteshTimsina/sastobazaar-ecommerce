'use server';

import fetcher from '@/lib/fetcher';
import type { APIResponse, Category, Product } from '@/types';
import { URL } from '@/lib/constants';

export async function getAllProducts() {
  const productsResponse = await fetcher<APIResponse<{ data: Product[] }>>(URL.PRODUCTS);

  const products = productsResponse.status ? productsResponse.data : [];

  return products;
}

export async function getAllCategories() {
  const categoryResponse = await fetcher<APIResponse<{ category: Category[] }>>(URL.CATEGORY);

  const categories = categoryResponse.status ? categoryResponse.category : [];

  return categories;
}
