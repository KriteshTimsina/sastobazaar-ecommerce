"use server";

import fetcher from "@/lib/fetcher";
import type { APIResponse, Product } from "@/types";
import { URL } from "@/lib/constants";

export async function getAllProducts() {
  const productsResponse = await fetcher<APIResponse<{ product: Product[] }>>(
    URL.PRODUCTS
  );

  const products = productsResponse.status ? productsResponse.product : [];

  return products;
}
