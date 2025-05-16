"use client";

import type { CartItem, Product } from '@/types';
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
        localStorage.removeItem('cartItems');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id);
      if (quantity <= 0) return prevItems;
      
      const quantityToAdd = Math.min(quantity, product.stock - (existingItem?.quantity || 0));
      if (quantityToAdd <= 0 && product.stock > 0) {
         toast({ title: "Not enough stock", description: `Only ${product.stock - (existingItem?.quantity || 0)} more available.`, variant: "destructive" });
         return prevItems;
      }
      if (product.stock === 0) {
        toast({ title: "Out of stock", description: `${product.name} is currently out of stock.`, variant: "destructive" });
        return prevItems;
      }


      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityToAdd;
        if (newQuantity > product.stock) {
          toast({ title: "Not enough stock", description: `Cannot add ${quantityToAdd}. Max ${product.stock} available for ${product.name}.`, variant: "destructive" });
          return prevItems.map(item =>
            item.productId === product.id ? { ...item, quantity: product.stock } : item
          );
        }
        toast({ title: "Item updated", description: `${product.name} quantity increased.` });
        return prevItems.map(item =>
          item.productId === product.id ? { ...item, quantity: newQuantity } : item
        );
      }
      toast({ title: "Item added", description: `${product.name} added to cart.` });
      return [...prevItems, { 
        productId: product.id, 
        name: product.name, 
        price: product.price, 
        quantity: quantityToAdd, 
        imageUrl: product.imageUrl,
        stock: product.stock 
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    toast({ title: "Item removed", description: "Item removed from cart." });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.productId === productId) {
          if (quantity <= 0) {
            // This case should ideally lead to removal, handled by a separate button or logic
            // For now, prevent quantity from going below 1 or remove if 0
            toast({ title: "Invalid quantity", description: "Quantity must be at least 1.", variant: "destructive" });
            return item; // Or implement removal logic here
          }
          if (quantity > item.stock) {
            toast({ title: "Not enough stock", description: `Max ${item.stock} available for ${item.name}.`, variant: "destructive" });
            return { ...item, quantity: item.stock };
          }
          return { ...item, quantity };
        }
        return item;
      }).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast({ title: "Cart cleared", description: "All items removed from cart." });
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
