import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/logo";
import { BottomHeader } from "./shared/bottom-header";
import { SearchComponent } from "./search-component";

const categoryNavItems = [
  {
    title: "Electronics",
    href: "/products?category=electronics"
  },
  {
    title: "Clothing",
    href: "/products?category=clothing"
  },
  {
    title: "Home & Kitchen",
    href: "/products?category=home-kitchen"
  },
  {
    title: "Beauty",
    href: "/products?category=beauty"
  },
  {
    title: "Sports",
    href: "/products?category=sports"
  }
];

export default async function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b px-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="mt-8 flex flex-col gap-4 p-5">
                <div className="mt-4 border-t pt-4">
                  <p className="mb-2 font-medium">Categories</p>
                  {categoryNavItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="hover:text-primary block py-2 text-sm transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>
        <SearchComponent />
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0">3</Badge>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">Sign Up</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/user">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/orders">Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/user/profile">Profile</Link>
              </DropdownMenuItem>
              {/* {isAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">Admin Dashboard</Link>
                  </DropdownMenuItem>
                </>
              )} */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <BottomHeader />
      {/* Bottom header - Categories */}
    </header>
  );
}
