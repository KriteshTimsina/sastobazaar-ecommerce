"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { SearchIcon, X, Flame, Clock, Trash2, Camera, ChevronLeft, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { cn } from "@/lib/utils";

// Types
type SearchResult = {
  id: string;
  name: string;
  category: string;
  image: string;
};

type SearchSuggestion = {
  term: string;
  isTrending?: boolean;
};

const RECENT_SEARCHES_KEY = "nextshop-recent-searches";

const trendingSearches: SearchSuggestion[] = [
  { term: "Dress", isTrending: true },
  { term: "Shoes For Women", isTrending: true },
  { term: "Dresses For Ladies Elegant", isTrending: true },
  { term: "Phone Case", isTrending: true },
  { term: "Women Sandals Flat" },
  { term: "Bags For Women" },
  { term: "Jeans" },
  { term: "Bikini", isTrending: true },
  { term: "Dresses" },
  { term: "Skirt" },
  { term: "Heels" },
  { term: "Glowmode" }
];

const generateSearchSuggestions = (query: string): string[] => {
  if (!query) return [];

  const baseTerms = [
    query,
    `${query} For Women`,
    `${query} For Ladies`,
    `${query} For Women Black`,
    `${query} Accessories`,
    `${query} Black`,
    `${query} For Women White`,
    `${query} With Bow`,
    `${query} White`,
    `${query} For Girls`,
    `${query} For Women Gold`,
    `${query} Silver`,
    `${query} Kids`,
    `${query} Brown`,
    `${query} Clear`,
    `${query} Green`,
    `${query} Gold`,
    `${query} For Teens`,
    `${query} Blue`,
    `${query} Pink`
  ];

  return baseTerms;
};

interface SearchComponentProps {
  className?: string;
}

export function SearchComponent({ className }: SearchComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isFullScreen && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFullScreen]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredProducts = products
        .filter(
          product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image
        }));

      setSearchResults(filteredProducts);

      setSearchSuggestions(generateSearchSuggestions(query));
    } else {
      setSearchResults([]);
      setSearchSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    if (isFullScreen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFullScreen]);

  const handleSearch = (searchTerm: string = query) => {
    if (!searchTerm.trim()) return;

    const updatedRecentSearches = [searchTerm, ...recentSearches.filter(term => term !== searchTerm)].slice(0, 5);

    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecentSearches));

    router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    setIsOpen(false);
    setIsFullScreen(false);
    setQuery("");
  };

  const clearRecentSearches = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  // Remove a specific recent search
  const removeRecentSearch = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const updatedRecentSearches = recentSearches.filter(t => t !== term);
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedRecentSearches));
  };

  // Open full-screen search on mobile
  const openFullScreenSearch = () => {
    setIsFullScreen(true);
    setIsOpen(true);
  };

  // Close full-screen search
  const closeFullScreenSearch = () => {
    setIsFullScreen(false);
    setIsOpen(false);
    setQuery("");
  };

  // Render the full-screen mobile search overlay
  if (isFullScreen) {
    return (
      <div className="bg-background fixed inset-0 z-50">
        <div className="flex h-full flex-col">
          {/* Search header */}
          <div className="flex items-center border-b p-4">
            <Button variant="ghost" size="icon" onClick={closeFullScreenSearch} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search for products..."
                className=" pr-16"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center">
                {query && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuery("")}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear</span>
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Image search</span>
                </Button>
              </div>
            </div>
            <Button variant="default" className="ml-2 bg-black" onClick={() => handleSearch()}>
              <SearchIcon className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>

          {/* Search content */}
          <div className="flex-1 overflow-auto">
            {/* Show search suggestions when typing */}
            {query && searchSuggestions.length > 0 && (
              <div className="py-2">
                {searchSuggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    className="hover:bg-muted flex w-full items-center px-4 py-2 text-left"
                    onClick={() => handleSearch(suggestion)}
                  >
                    <SearchIcon className="text-muted-foreground mr-2 h-4 w-4" />
                    <span>
                      {suggestion.split(new RegExp(`(${query})`, "i")).map((part, i) =>
                        part.toLowerCase() === query.toLowerCase() ? (
                          <span key={i} className="font-semibold">
                            {part}
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Show product results when typing */}
            {query && searchResults.length > 0 && (
              <div className="border-t py-2">
                <div className="text-muted-foreground px-4 py-2 text-sm font-medium">Products</div>
                {searchResults.map(result => (
                  <Link
                    key={result.id}
                    href={`/products/${result.id}`}
                    className="hover:bg-muted flex items-center gap-3 px-4 py-2"
                    onClick={() => {
                      setIsFullScreen(false);
                      setIsOpen(false);
                    }}
                  >
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <Image src={result.image || "/placeholder.svg"} alt={result.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{result.name}</p>
                      <p className="text-muted-foreground text-xs capitalize">{result.category}</p>
                    </div>
                  </Link>
                ))}
                <div className="border-t px-4 py-2">
                  <Button variant="ghost" className="text-primary w-full justify-center" onClick={() => handleSearch()}>
                    See all results for {query}
                  </Button>
                </div>
              </div>
            )}

            {/* No results */}
            {query && searchResults.length === 0 && searchSuggestions.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-muted-foreground">No results found for {query}</p>
              </div>
            )}

            {/* Show search discovery when no query */}
            {!query && (
              <div className="p-4">
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="flex items-center text-lg font-semibold">
                        <Clock className="mr-2 h-4 w-4" />
                        Recently Searched
                      </h3>
                      <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map(term => (
                        <div key={term} className="group relative">
                          <Badge
                            variant="outline"
                            className="bg-muted/50 hover:bg-muted cursor-pointer"
                            onClick={() => handleSearch(term)}
                          >
                            {term}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-1 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={e => removeRecentSearch(e, term)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search discovery */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Search Discovery</h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.slice(0, 8).map(item => (
                      <Badge
                        key={item.term}
                        variant="outline"
                        className="bg-muted/50 hover:bg-muted cursor-pointer"
                        onClick={() => handleSearch(item.term)}
                      >
                        {item.isTrending && <Flame className="mr-1 h-3 w-3 text-red-500" />}
                        {item.term}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      More
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} ref={searchRef}>
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={openFullScreenSearch}>
          <SearchIcon className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      <div className="hidden items-center md:flex">
        <div className="min-w-sm lg:min-w-md relative w-full">
          <Input
            type="search"
            placeholder="Search for products..."
            className="pr-10"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {query && (
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setQuery("")}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Button variant="default" className="ml-2 bg-black" onClick={() => handleSearch()}>
          <SearchIcon className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>

      {isOpen && !isFullScreen && (
        <div className="bg-background absolute z-50 mt-2 w-full rounded-md border shadow-lg">
          {!query && (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="flex items-center text-lg font-semibold">
                      <Clock className="mr-2 h-4 w-4" />
                      Recently Searched
                    </h3>
                    <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(term => (
                      <div key={term} className="group relative">
                        <Badge
                          variant="outline"
                          className="bg-muted/50 hover:bg-muted cursor-pointer"
                          onClick={() => handleSearch(term)}
                        >
                          {term}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={e => removeRecentSearch(e, term)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="mb-2 text-lg font-semibold">Search Discovery</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map(item => (
                    <Badge
                      key={item.term}
                      variant="outline"
                      className="bg-muted/50 hover:bg-muted cursor-pointer"
                      onClick={() => handleSearch(item.term)}
                    >
                      {item.isTrending && <Flame className="mr-1 h-3 w-3 text-red-500" />}
                      {item.term}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && searchSuggestions.length > 0 && (
            <div className="py-2">
              {searchSuggestions.map(suggestion => (
                <button
                  key={suggestion}
                  className="hover:bg-muted flex w-full items-center px-4 py-2 text-left"
                  onClick={() => handleSearch(suggestion)}
                >
                  <SearchIcon className="text-muted-foreground mr-2 h-4 w-4" />
                  <span>
                    {suggestion.split(new RegExp(`(${query})`, "i")).map((part, i) =>
                      part.toLowerCase() === query.toLowerCase() ? (
                        <span key={i} className="font-semibold">
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </span>
                </button>
              ))}
            </div>
          )}

          {query && searchResults.length > 0 && (
            <div className="border-t py-2">
              <div className="text-muted-foreground px-4 py-2 text-sm font-medium">Products</div>
              {searchResults.map(result => (
                <Link
                  key={result.id}
                  href={`/products/${result.id}`}
                  className="hover:bg-muted flex items-center gap-3 px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image src={result.image || "/placeholder.svg"} alt={result.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{result.name}</p>
                    <p className="text-muted-foreground text-xs capitalize">{result.category}</p>
                  </div>
                </Link>
              ))}
              <div className="border-t px-4 py-2">
                <Button variant="ghost" className="text-primary w-full justify-center" onClick={() => handleSearch()}>
                  See all results for {query}
                </Button>
              </div>
            </div>
          )}

          {query && searchResults.length === 0 && searchSuggestions.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">No results found for {query}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
