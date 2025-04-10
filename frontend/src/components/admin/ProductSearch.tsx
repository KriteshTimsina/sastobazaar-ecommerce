"use client";
import { Search } from "lucide-react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ProductSearch = ({ q }: { q: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(q);
  const params = new URLSearchParams(searchParams.toString());

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    params.set("q", query);
    router.push(`${pathname}?${params}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value === "") {
      params.delete("q");
      router.push(`${pathname}`);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <form onSubmit={handleSearch} className="relative max-w-sm flex-1">
        <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
        <Input
          onChange={handleChange}
          type="search"
          placeholder="Search products..."
          className="pl-8"
          value={query}
          onBlur={() => console.log("BLUE", query)}
        />
      </form>
    </div>
  );
};

export default ProductSearch;
