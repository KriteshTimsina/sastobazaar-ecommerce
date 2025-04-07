import { IProductInput } from "@/types/schema";
import { clientFetcher } from "./fetcher";
import { URL } from "./constants";

export async function createProduct(product: IProductInput) {
  const formData = new FormData();
  Object.entries(product).forEach(([key, value]) => {
    if (key === "images") return;
    formData.append(key, String(value));
  });

  product.images.map(image => {
    if (image instanceof File) {
      formData.append("images", image);
    }
  });

  for (const pair of formData.entries()) {
    console.log("FormData entry:", pair[0], pair[1]);
  }

  return clientFetcher<{ status: boolean; message: string }>(URL.PRODUCTS, {
    body: formData,
    method: "POST",
    headers: {
      Accept: "multipart/form-data"
    }
  });
}
