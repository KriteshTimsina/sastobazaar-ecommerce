import Link from 'next/link';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { getAllCategories } from '@/app/actions/product';
import { ChevronRight } from 'lucide-react';

export const BottomHeader = async () => {
  const categories = await getAllCategories();

  return (
    <div className="container hidden items-center h-10 md:flex">
      <nav className="flex gap-4 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid gap-3 p-2 w-64">
                  {categories.map((category) => (
                    <li className="w-full group" key={category._id}>
                      <div className="relative w-full">
                        <div className="flex justify-between items-center w-full p-2 text-sm font-medium rounded hover:bg-slate-100 cursor-pointer">
                          {category.title}
                          <ChevronRight size={12} />
                        </div>

                        {/* Subcategory dropdown with improved visibility */}
                        <div className="fixed left-72 top-28 ml-1 hidden group-hover:block w-64 bg-white shadow-md rounded-md p-2 z-[999]">
                          <ul className="grid gap-2">
                            <div className="w-full p-2 text-sm font-medium border-b">
                              {category.title}
                            </div>
                            {category.subCategories.map((sub) => (
                              <li key={sub._id} className="w-full">
                                <Link
                                  href={`/category/${category._id}/sub/${sub._id}`}
                                  className="block w-full p-2 text-sm rounded hover:bg-slate-100"
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {categories.map((item) => (
          <Link
            key={item._id}
            href={`/category/${item._id}`}
            className="text-sm transition-colors hover:text-primary"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};
