import type { Category, Product, Order, UserProfile } from '@/types';

export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Electronics', description: 'Gadgets and devices' },
  { id: 'cat2', name: 'Books', description: 'Printed and digital books' },
  { id: 'cat3', name: 'Clothing', description: 'Apparel and accessories' },
];

export const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Super Smartphone X',
    description: 'Latest generation smartphone with AI features.',
    price: 799.99,
    stock: 25,
    category: mockCategories[0],
    imageUrl: 'https://placehold.co/600x400.png?text=Smartphone+X',
  },
  {
    id: 'prod2',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immersive sound experience with long battery life.',
    price: 199.50,
    stock: 50,
    category: mockCategories[0],
    imageUrl: 'https://placehold.co/600x400.png?text=Headphones',
  },
  {
    id: 'prod3',
    name: 'The Art of Coding',
    description: 'A comprehensive guide to software development.',
    price: 49.99,
    stock: 100,
    category: mockCategories[1],
    imageUrl: 'https://placehold.co/600x400.png?text=Coding+Book',
  },
  {
    id: 'prod4',
    name: 'Mystery Novel: The Silent Witness',
    description: 'A thrilling mystery that will keep you on edge.',
    price: 15.99,
    stock: 0, // Out of stock example
    category: mockCategories[1],
    imageUrl: 'https://placehold.co/600x400.png?text=Mystery+Novel',
  },
  {
    id: 'prod5',
    name: 'Classic Cotton T-Shirt',
    description: 'Comfortable and durable 100% cotton t-shirt.',
    price: 25.00,
    stock: 200,
    category: mockCategories[2],
    imageUrl: 'https://placehold.co/600x400.png?text=T-Shirt',
  },
  {
    id: 'prod6',
    name: 'Smartwatch Series 5',
    description: 'Track your fitness and stay connected.',
    price: 349.00,
    stock: 30,
    category: mockCategories[0],
    imageUrl: 'https://placehold.co/600x400.png?text=Smartwatch',
  },
  {
    id: 'prod7',
    name: 'Learning Python, 3rd Edition',
    description: 'An in-depth guide to Python programming.',
    price: 59.95,
    stock: 75,
    category: mockCategories[1],
    imageUrl: 'https://placehold.co/600x400.png?text=Python+Book',
  },
  {
    id: 'prod8',
    name: 'Men\'s Winter Jacket',
    description: 'Warm and stylish jacket for cold weather.',
    price: 120.00,
    stock: 40,
    category: mockCategories[2],
    imageUrl: 'https://placehold.co/600x400.png?text=Winter+Jacket',
  },
  {
    id: 'prod9',
    name: 'Ultra HD 4K Monitor',
    description: 'Experience stunning visuals with this 27-inch 4K monitor.',
    price: 450.00,
    stock: 15,
    category: mockCategories[0],
    imageUrl: 'https://placehold.co/600x400.png?text=4K+Monitor',
  },
  {
    id: 'prod10',
    name: 'Sci-Fi Epic: Galaxy\'s Edge',
    description: 'A sprawling space opera adventure.',
    price: 22.50,
    stock: 60,
    category: mockCategories[1],
    imageUrl: 'https://placehold.co/600x400.png?text=Sci-Fi+Book',
  },
  {
    id: 'prod11',
    name: 'Women\'s Running Shoes',
    description: 'Lightweight and comfortable shoes for running.',
    price: 89.99,
    stock: 80,
    category: mockCategories[2],
    imageUrl: 'https://placehold.co/600x400.png?text=Running+Shoes',
  },
];

export const mockUser: UserProfile = {
  id: 'user1',
  email: 'testuser@example.com',
  name: 'Test User',
  phone: '123-456-7890',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    country: 'USA',
  },
};

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    products: [
      { productId: 'prod1', name: 'Super Smartphone X', quantity: 1, priceAtOrder: 799.99, imageUrl: mockProducts[0].imageUrl },
      { productId: 'prod3', name: 'The Art of Coding', quantity: 2, priceAtOrder: 49.99, imageUrl: mockProducts[2].imageUrl },
    ],
    totalPrice: 799.99 + (49.99*2),
    status: 'delivered',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    shippingAddress: mockUser.address!,
  },
  {
    id: 'order2',
    userId: 'user1',
    products: [
      { productId: 'prod2', name: 'Wireless Noise-Cancelling Headphones', quantity: 1, priceAtOrder: 199.50, imageUrl: mockProducts[1].imageUrl },
    ],
    totalPrice: 199.50,
    status: 'shipped',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    shippingAddress: mockUser.address!,
  },
  {
    id: 'order3',
    userId: 'user1',
    products: [
      { productId: 'prod5', name: 'Classic Cotton T-Shirt', quantity: 3, priceAtOrder: 25.00, imageUrl: mockProducts[4].imageUrl },
    ],
    totalPrice: 25.00 * 3,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    shippingAddress: mockUser.address!,
  },
];
