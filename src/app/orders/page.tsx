"use client";

import { useEffect, useState } from 'react';
import OrderListItem from '@/components/orders/OrderListItem';
import { useAuth } from '@/contexts/AuthContext';
import type { Order } from '@/types';
import { mockOrders, mockUser } from '@/lib/mock-data'; // Assuming orders are tied to mockUser for now
import { Pagination } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { ListOrdered, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const ORDERS_PER_PAGE = 5;

export default function OrdersPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({ title: "Authentication Required", description: "Please login to view your orders.", variant: "destructive" });
      router.push('/login?redirect=/orders');
    } else if (!authLoading && isAuthenticated && user) {
      setIsLoading(true);
      // Simulate API call to fetch orders for the current user
      setTimeout(() => {
        // Filter mockOrders for the current user. In a real app, this would be an API call.
        const userOrders = mockOrders.filter(order => order.userId === user.id);
        setOrders(userOrders);
        setIsLoading(false);
      }, 1000);
    }
  }, [user, isAuthenticated, authLoading, router, toast]);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (authLoading || (isAuthenticated && isLoading)) {
    return (
      <div className="space-y-6 py-8">
        <Skeleton className="h-10 w-1/3" /> {/* Title Skeleton */}
        <Skeleton className="h-6 w-1/2" /> {/* Subtitle Skeleton */}
        <Separator />
        {Array.from({ length: 3 }).map((_, index) => (
          <OrderCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!isAuthenticated) {
     return null; // Or a message, but redirect handles it.
  }


  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-semibold">No Orders Yet</h1>
        <p className="text-muted-foreground mt-2 mb-6">You haven&apos;t placed any orders. Start shopping to see your orders here.</p>
        <Link href="/products" passHref legacyBehavior>
          <Button size="lg">Shop Now</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground flex items-center">
          <ListOrdered className="mr-3 h-10 w-10 text-primary" /> Your Orders
        </h1>
        <p className="text-lg text-muted-foreground">Track and manage all your past purchases.</p>
      </header>
      <Separator className="my-6"/>
      <div className="space-y-6">
        {paginatedOrders.map(order => (
          <OrderListItem key={order.id} order={order} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={ORDERS_PER_PAGE}
            totalItems={orders.length}
        />
      )}
    </div>
  );
}

function OrderCardSkeleton() {
  return (
    <div className="border bg-card text-card-foreground shadow-sm rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/3 rounded-md" />
        <Skeleton className="h-6 w-1/4 rounded-md" />
      </div>
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <div className="flex space-x-2">
        <Skeleton className="h-16 w-16 rounded-md" />
        <Skeleton className="h-16 w-16 rounded-md" />
      </div>
      <Skeleton className="h-5 w-1/4 rounded-md" />
      <Skeleton className="h-10 w-full sm:w-1/4 rounded-md ml-auto" />
    </div>
  )
}
