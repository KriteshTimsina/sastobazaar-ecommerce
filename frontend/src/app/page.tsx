import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import banner from '@/assets/images/banner.jpg';
import Products from '@/components/shared/products';

export default async function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10 mx-auto">
      {/* Hero Banner */}
      <section className="relative h-[500px] w-full ">
        <Image src={banner} alt="Hero Banner" fill className="object-cover" />
        <div className="flex absolute inset-0 items-center px-10 bg-black/40">
          <div className="container">
            <div className="max-w-lg text-white">
              <h1 className="mb-4 text-4xl font-bold">Summer Collection 2024</h1>
              <p className="mb-6 text-lg">
                Discover our latest products with amazing discounts up to 50% off.
              </p>
              <Button asChild size="lg">
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Slider */}
      {/* <section className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link
            href="/categories"
            className="flex items-center text-sm font-medium text-primary"
          >
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem
                key={category.id}
                className="md:basis-1/3 lg:basis-1/5"
              >
                <Link href={`/products?category=${category.slug}`}>
                  <div className="overflow-hidden relative h-40 rounded-lg group">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="flex absolute inset-0 justify-center items-center bg-black/30">
                      <h3 className="text-lg font-medium text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-center text-muted-foreground">
                    {category.productCount} Products
                  </p>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section> */}

      {/* Featured Products */}
      <Products />
    </div>
  );
}
