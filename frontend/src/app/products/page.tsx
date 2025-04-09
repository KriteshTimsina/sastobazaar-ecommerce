import { getAllProducts } from "../actions/product";
import ProductHeader from "@/components/product-header";
import { ProductCard } from "@/components/shared/product-card";
import ProductCardList from "@/components/shared/product-card-list";
import { type DisplayMode } from "@/types/products";

type ProductScreenProps = {
  searchParams: Promise<{ mode: DisplayMode }>;
};

export default async function ProductsPage({ searchParams }: ProductScreenProps) {
  const products = await getAllProducts();
  const { mode = "grid" } = await searchParams;
  return (
    <div className="container mx-auto px-10 py-8">
      <div className="flex flex-col gap-6">
        <ProductHeader mode={mode} />

        {mode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => {
              return <ProductCard product={product} key={product._id} />;
            })}
          </div>
        ) : mode === "list" ? (
          <div className="space-y-4">
            {products.map(product => (
              <ProductCardList product={product} key={product._id} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
