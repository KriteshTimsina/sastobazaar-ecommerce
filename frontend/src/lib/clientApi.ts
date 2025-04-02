import { IProductInput } from "@/types/schema";
import { clientFetcher } from "./fetcher";
import { URL } from "./constants";

export async function createProduct(product: IProductInput) {
  return clientFetcher<{ status: boolean; message: string }>(URL.PRODUCTS, {
    body: JSON.stringify(product),
    method: "POST",
  });
}
