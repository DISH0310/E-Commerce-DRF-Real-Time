"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.id}`} passHref>
          <div className="aspect-[4/3] relative w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              data-ai-hint={`${product.category.name} product`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:opacity-75 transition-opacity"
            />
          </div>
        </Link>
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">Out of Stock</Badge>
        )}
         {product.stock > 0 && product.stock < 10 && (
          <Badge variant="secondary" className="absolute top-2 right-2">Low Stock</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} passHref>
            <CardTitle className="text-lg font-semibold hover:text-primary transition-colors mb-1 truncate" title={product.name}>
              {product.name}
            </CardTitle>
        </Link>
        <Badge variant="outline" className="mb-2">{product.category.name}</Badge>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2" title={product.description}>
          {product.description}
        </CardDescription>
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button 
          onClick={handleAddToCart} 
          className="w-full" 
          disabled={product.stock === 0}
          variant={product.stock === 0 ? "outline" : "default"}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
