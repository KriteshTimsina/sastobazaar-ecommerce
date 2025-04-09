import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getProductById, getRelatedProducts } from "@/lib/data";
import ProductDetail from "@/components/product-detail";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductById(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found."
    };
  }

  return {
    title: `${product.name} | NextShop`,
    description: product.description,
    openGraph: {
      images: [{ url: product.image }]
    }
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.category);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
