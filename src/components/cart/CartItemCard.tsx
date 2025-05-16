"use client";

import Image from 'next/image';
import type { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      updateQuantity(item.productId, newQuantity);
    } else if (newQuantity < 1) {
      updateQuantity(item.productId, 1); // or removeFromCart(item.productId)
    } else if (newQuantity > item.stock) {
      updateQuantity(item.productId, item.stock);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b bg-card rounded-lg shadow-sm mb-4">
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-muted">
        <Image
          src={item.imageUrl}
          alt={item.name}
          data-ai-hint="product cart"
          fill
          sizes="100px"
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <Link href={`/products/${item.productId}`} passHref>
          <h3 className="text-base md:text-lg font-semibold hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">Price: ${item.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Available Stock: {item.stock}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          className="w-14 h-8 text-center"
          min="1"
          max={item.stock}
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity + 1)} disabled={item.quantity >= item.stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-base md:text-lg font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.productId)}>
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
