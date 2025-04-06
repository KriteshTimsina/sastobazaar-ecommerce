import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { APP_DATA } from '@/lib/constants';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="px-10 border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for all your shopping needs. Quality products, fast delivery, and
              excellent customer service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:underline">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=electronics" className="hover:underline">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products?category=clothing" className="hover:underline">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-kitchen" className="hover:underline">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link href="/products?category=beauty" className="hover:underline">
                  Beauty
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col justify-between items-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_DATA.NAME}. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-4 md:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
