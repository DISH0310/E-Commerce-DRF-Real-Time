"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; // Assuming orders are tied to users
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { Address, Order, OrderProduct } from '@/types'; // Import types

// Mock function to simulate order placement
const placeOrderAPI = async (userId: string, items: OrderProduct[], total: number, shippingAddress: Address): Promise<Order> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        userId,
        products: items,
        totalPrice: total,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        shippingAddress,
      };
      // In a real app, you'd save this to a backend and potentially update mockOrders or a state
      console.log('Order placed:', newOrder);
      resolve(newOrder);
    }, 1500);
  });
};


export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({ title: "Authentication Required", description: "Please login to proceed to checkout.", variant: "destructive"});
      router.push('/login?redirect=/checkout');
    } else if (cartItems.length === 0 && !orderPlaced) {
      toast({ title: "Empty Cart", description: "Your cart is empty. Add some products before checking out.", variant: "destructive"});
      router.push('/products');
    }
  }, [isAuthenticated, cartItems, router, orderPlaced, toast]);


  const handlePlaceOrder = async () => {
    if (!user || !user.address) {
        toast({ title: "Missing Information", description: "Please complete your profile with an address to place an order.", variant: "destructive"});
        router.push('/profile?redirect=/checkout');
        return;
    }

    setIsProcessing(true);
    setOrderError(null);
    try {
      const orderProducts: OrderProduct[] = cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        priceAtOrder: item.price,
        imageUrl: item.imageUrl,
      }));
      
      // Simulate API call to place order
      await placeOrderAPI(user.id, orderProducts, cartTotal, user.address);
      
      clearCart();
      setOrderPlaced(true);
      toast({ title: "Order Placed!", description: "Thank you for your purchase. Your order is being processed." });
    } catch (error) {
      console.error("Failed to place order:", error);
      setOrderError("There was an issue placing your order. Please try again.");
      toast({ title: "Order Failed", description: "Could not place your order. Please try again.", variant: "destructive"});
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Redirecting to login...</p>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="container mx-auto py-12 text-center">
        <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your purchase. Your order is now being processed. You can track its status in your orders page.
        </p>
        <div className="space-x-4">
          <Link href="/orders" passHref legacyBehavior><Button size="lg">View Orders</Button></Link>
          <Link href="/products" passHref legacyBehavior><Button size="lg" variant="outline">Continue Shopping</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Checkout</CardTitle>
          <CardDescription>Confirm your order details and place your order.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
            {user?.address ? (
              <div className="p-4 border rounded-md bg-muted/50 text-sm">
                <p><strong>{user.name || 'N/A'}</strong></p>
                <p>{user.address.street}</p>
                <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                <p>{user.address.country}</p>
                <Link href="/profile?editAddress=true" className="text-primary text-xs hover:underline">Edit Address</Link>
              </div>
            ) : (
              <p className="text-muted-foreground">Please add a shipping address to your profile.</p>
            )}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.productId} className="flex justify-between py-2 border-b text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 mt-2 font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          
          {orderError && <p className="text-destructive">{orderError}</p>}

        </CardContent>
        <CardFooter>
          <Button 
            size="lg" 
            className="w-full text-lg" 
            onClick={handlePlaceOrder} 
            disabled={isProcessing || cartItems.length === 0 || !user?.address}
          >
            {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
