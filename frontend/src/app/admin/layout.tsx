"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Box,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Package2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Box,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b">
        <div className="flex items-center px-4 h-16">
          <Link
            href="/admin/dashboard"
            className="flex items-center text-xl font-bold"
          >
            <Package2 className="mr-2 w-6 h-6" />
            Admin Panel
          </Link>
          <Button
            variant="outline"
            className="ml-auto md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "Hide Menu" : "Show Menu"}
          </Button>
        </div>
      </div>
      <div className="flex flex-1">
        <aside
          className={cn(
            "w-64 border-r bg-muted/40 md:block",
            isMobileMenuOpen
              ? "block fixed inset-y-0 z-50 pt-16 bg-background"
              : "hidden"
          )}
        >
          <div className="py-4 space-y-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                {sidebarNavItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href &&
                        "bg-primary text-primary-foreground"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 w-4 h-4" />
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="px-3 py-2">
              <Button variant="ghost" className="justify-start w-full" asChild>
                <Link href="/">
                  <ShoppingCart className="mr-2 w-4 h-4" />
                  View Store
                </Link>
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
