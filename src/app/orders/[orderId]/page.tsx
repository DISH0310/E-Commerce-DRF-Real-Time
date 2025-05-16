"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type { Order, OrderProduct } from '@/types';
import { mockOrders } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import OrderStatusIcon from '@/components/orders/OrderStatusIcon';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, ArrowLeft, Home, MapPin, ShoppingBag, Package, UserCircle } from 'lucide-react';

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
        toast({ title: "Authentication Required", description: "Please login to view order details.", variant: "destructive" });
        router.push(`/login?redirect=/orders/${orderId}`);
    } else if (!authLoading && isAuthenticated && orderId && user) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const foundOrder = mockOrders.find(o => o.id === orderId && o.userId === user.id);
            setOrder(foundOrder || null);
            setIsLoading(false);
        }, 500);
    }
  }, [orderId, user, isAuthenticated, authLoading, router, toast]);

  if (authLoading || isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (!isAuthenticated) return null; // Should be redirected

  if (!order) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="mx-auto h-24 w-24 text-destructive mb-6" />
        <h1 className="text-3xl font-semibold">Order Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The order you are looking for does not exist or you do not have permission to view it.
        </p>
        <Link href="/orders" passHref legacyBehavior>
          <Button className="mt-6">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div className="container mx-auto py-8">
      <Link href="/orders" className="inline-flex items-center text-primary hover:underline mb-6 group">
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to All Orders
      </Link>

      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <CardTitle className="text-3xl font-bold">Order #{order.id.substring(0,8)}...</CardTitle>
                <CardDescription className="text-base">Placed on: {orderDate}</CardDescription>
            </div>
            <div className="mt-2 sm:mt-0">
                <OrderStatusIcon status={order.status} className="text-lg" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold flex items-center"><ShoppingBag className="mr-2 h-6 w-6 text-primary" />Items Ordered</h3>
            <ul className="space-y-4">
              {order.products.map((item: OrderProduct) => (
                <li key={item.productId} className="flex items-start space-x-4 p-4 border rounded-lg bg-background">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                    <Image src={item.imageUrl} alt={item.name} data-ai-hint="product ordered detail" fill sizes="80px" className="object-cover"/>
                  </div>
                  <div className="flex-grow">
                    <Link href={`/products/${item.productId}`} passHref>
                      <h4 className="font-medium hover:text-primary transition-colors">{item.name}</h4>
                    </Link>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm text-muted-foreground">Price per item: ${item.priceAtOrder.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold text-right">${(item.priceAtOrder * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center mb-2"><Package className="mr-2 h-6 w-6 text-primary" />Order Summary</h3>
              <div className="space-y-1 p-4 border rounded-lg bg-background">
                <div className="flex justify-between"><span>Subtotal:</span><span>${order.totalPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping:</span><span>$0.00 (Free)</span></div>
                <div className="flex justify-between"><span>Tax:</span><span>$0.00</span></div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>${order.totalPrice.toFixed(2)}</span></div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center mb-2"><MapPin className="mr-2 h-6 w-6 text-primary" />Shipping Address</h3>
              <div className="p-4 border rounded-lg bg-background text-sm">
                <p><strong>{user?.name || order.shippingAddress.street.split(' ')[0] + ' (Name from address)'}</strong></p>
                <p>{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 flex justify-end">
          {/* Potential actions like "Reorder", "Return Items" could go here */}
          <Button variant="outline" onClick={() => router.push('/products')}>Continue Shopping</Button>
        </CardFooter>
      </Card>
    </div>
  );
}


function OrderDetailSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-6 w-40 mb-6 rounded-md" /> {/* Back link */}
      <Card>
        <CardHeader className="bg-muted/30 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <Skeleton className="h-10 w-3/4 sm:w-1/2 mb-2 rounded-md" /> {/* Title */}
              <Skeleton className="h-5 w-1/2 sm:w-1/3 rounded-md" /> {/* Date */}
            </div>
            <Skeleton className="h-8 w-28 mt-2 sm:mt-0 rounded-md" /> {/* Status */}
          </div>
        </CardHeader>
        <CardContent className="p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-8 w-40 mb-2 rounded-md" /> {/* Items Ordered Title */}
            {Array.from({length: 2}).map((_, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 border rounded-lg">
                <Skeleton className="h-20 w-20 rounded-md" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                  <Skeleton className="h-4 w-1/3 rounded-md" />
                </div>
                <Skeleton className="h-6 w-20 rounded-md" />
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-44 mb-2 rounded-md" /> {/* Order Summary Title */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Separator className="my-2" />
                <Skeleton className="h-6 w-full rounded-md" />
              </div>
            </div>
            <div>
              <Skeleton className="h-8 w-48 mb-2 rounded-md" /> {/* Shipping Address Title */}
              <div className="space-y-2 p-4 border rounded-lg">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-1/2 rounded-md" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6 flex justify-end">
          <Skeleton className="h-10 w-36 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
}
