import Image from 'next/image';
import Link from 'next/link';
import { Clock, Package } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getOrdersByUserId } from '@/lib/data';

export default function UserDashboard() {
  const recentOrders = getOrdersByUserId('1').slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground">Manage your account settings and view orders</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Package className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Order #{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <Badge variant="outline">{order.status}</Badge>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent orders found.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/user/orders">View all orders</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=64&width=64"
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-1">
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground">
                123 Main St, Apt 4B
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
            <div className="grid gap-1">
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/user/profile">Edit profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Overview of your account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Wishlist Items</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Reviews</p>
              <p className="text-3xl font-bold">3</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
