
export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  imageUrl: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stock: number; // Added to check against when adding to cart/updating quantity
}

export interface OrderProduct {
  productId: string;
  name: string;
  quantity: number;
  priceAtOrder: number; // Price at the time of order
  imageUrl: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  shippingAddress: Address;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: Address;
}
