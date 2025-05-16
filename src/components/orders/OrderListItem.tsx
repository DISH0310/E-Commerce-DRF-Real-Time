"use client";

import type { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import OrderStatusIcon from './OrderStatusIcon';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface OrderListItemProps {
  order: Order;
}

export default function OrderListItem({ order }: OrderListItemProps) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <CardTitle className="text-xl mb-2 sm:mb-0">Order #{order.id.substring(0,8)}...</CardTitle>
          <OrderStatusIcon status={order.status} />
        </div>
        <p className="text-sm text-muted-foreground">Placed on: {orderDate}</p>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-3 overflow-x-auto py-1">
            {order.products.slice(0, 3).map(p => (
                 <div key={p.productId} className="relative w-16 h-16 rounded-md overflow-hidden border shrink-0">
                    <Image src={p.imageUrl} alt={p.name} fill sizes="64px" className="object-cover" data-ai-hint="product order" />
                 </div>
            ))}
            {order.products.length > 3 && (
                <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-sm text-muted-foreground shrink-0">
                    +{order.products.length - 3} more
                </div>
            )}
        </div>
        <p className="text-lg font-semibold">Total: ${order.totalPrice.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">{order.products.length} item(s)</p>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Link href={`/orders/${order.id}`} passHref legacyBehavior>
          <Button variant="outline" className="w-full sm:w-auto ml-auto">
            View Details <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
