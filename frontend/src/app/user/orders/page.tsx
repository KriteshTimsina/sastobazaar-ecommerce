import Link from "next/link"
import Image from "next/image"
import { Eye, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getOrdersByUserId, getProductById } from "@/lib/data"

export default function OrdersPage() {
  const orders = getOrdersByUserId("1")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">View and manage your order history</p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {new Date(order.createdAt).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "default"
                        : order.status === "shipped"
                          ? "secondary"
                          : order.status === "processing"
                            ? "outline"
                            : "destructive"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.products.map((item) => {
                    const product = getProductById(item.productId)
                    if (!product) return null

                    return (
                      <div key={item.productId} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    )
                  })}

                  <Separator />

                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Total</p>
                      <p className="text-sm text-muted-foreground">Including shipping and taxes</p>
                    </div>
                    <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {order.status === "delivered"
                          ? "Delivered on " + new Date(order.updatedAt).toLocaleDateString()
                          : order.status === "shipped"
                            ? "Shipped on " + new Date(order.updatedAt).toLocaleDateString()
                            : order.status === "processing"
                              ? "Processing"
                              : "Pending"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No orders found</CardTitle>
            <CardDescription>You haven&apos;t placed any orders yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

