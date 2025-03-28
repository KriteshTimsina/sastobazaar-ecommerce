"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreditCard, LogOut, Package, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const sidebarNavItems = [
  {
    title: "Account",
    href: "/user",
    icon: User,
  },
  {
    title: "Orders",
    href: "/user/orders",
    icon: Package,
  },
  {
    title: "Billing",
    href: "/user/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/user/settings",
    icon: Settings,
  },
]

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className={cn("md:w-64 md:block", isMobileMenuOpen ? "block" : "hidden")}>
          <div className="space-y-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
              <div className="space-y-1">
                {sidebarNavItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href && "bg-primary text-primary-foreground",
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="px-3 py-2">
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>
        <Button variant="outline" className="md:hidden mb-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? "Hide Menu" : "Show Menu"}
        </Button>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

