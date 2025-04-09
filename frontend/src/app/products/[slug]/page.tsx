import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getRelatedProducts } from "@/lib/data";
import ProductDetail from "@/components/product-detail";
import { getSingleProduct } from "@/app/actions/product";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found."
    };
  }

  return {
    title: `${product.title} | NextShop`,
    description: product.description,
    openGraph: {
      images: [{ url: product.title }]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  console.log("product", JSON.stringify(product, null, 2));

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts("1", product.category);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
