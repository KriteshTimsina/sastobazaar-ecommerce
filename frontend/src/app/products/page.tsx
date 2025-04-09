import ProductHeader from "@/components/product-header";
import { getAllProducts } from "../actions/product";
import { ProductCard } from "@/components/shared/product-card";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="container mx-auto px-10 py-8">
      <div className="flex flex-col gap-6">
        <ProductHeader />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>

        {/* Products */}
        {/* {sortedProducts.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground mt-2">
              {"Try adjusting your search or filter to find what you're looking for."}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map(product => (
              <Card key={product.id} className="group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {product.discount && (
                      <Badge className="bg-primary absolute right-2 top-2">{product.discount}% OFF</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center">
                    <div className="flex text-yellow-400">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4"
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                          />
                        ))}
                    </div>
                    <span className="text-muted-foreground ml-2 text-xs">{product.rating}</span>
                  </div>
                  <h3 className="line-clamp-1 font-medium">{product.name}</h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{product.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div>
                    {product.discount ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        <span className="text-muted-foreground text-sm line-through">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                  <Button size="icon" variant="outline">
                    <ShoppingBag className="h-4 w-4" />
                    <span className="sr-only">Add to cart</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedProducts.map(product => (
              <Card key={product.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-48 shrink-0 sm:h-auto sm:w-48">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.discount && (
                      <Badge className="bg-primary absolute right-2 top-2">{product.discount}% OFF</Badge>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex items-center">
                      <div className="flex text-yellow-400">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4"
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            />
                          ))}
                      </div>
                      <span className="text-muted-foreground ml-2 text-xs">{product.rating}</span>
                    </div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 mt-1 text-sm">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div>
                        {product.discount ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">
                              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-muted-foreground text-sm line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
