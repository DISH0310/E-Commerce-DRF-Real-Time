"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Corrected import
import type { Product } from '@/types';
import { mockProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Package, CheckCircle, AlertTriangle, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundProduct = mockProducts.find(p => p.id === productId);
        setProduct(foundProduct || null);
        setIsLoading(false);
      }, 500);
    }
  }, [productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (product && value > 0 && value <= product.stock) {
      setQuantity(value);
    } else if (value <= 0) {
      setQuantity(1);
    }
  };
  
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      if (quantity > product.stock) {
        toast({ title: "Error", description: "Quantity exceeds available stock.", variant: "destructive" });
        return;
      }
      addToCart(product, quantity);
    }
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-semibold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you are looking for does not exist.</p>
        <Link href="/products" passHref legacyBehavior>
          <Button className="mt-6">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-muted">
            <Image
              src={product.imageUrl}
              alt={product.name}
              data-ai-hint={`${product.category.name} product detail`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 md:p-8"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0">
              <Badge variant="outline" className="w-fit mb-2">{product.category.name}</Badge>
              <CardTitle className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</CardTitle>
              {/* Placeholder for ratings */}
              <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-gray-300 fill-gray-300" />
                <span className="ml-1">(123 Reviews)</span> {/* Mock reviews */}
              </div>
              <CardDescription className="text-base text-muted-foreground mb-4">
                {product.description}
              </CardDescription>
            </CardHeader>
            
            <Separator className="my-4" />

            <CardContent className="p-0 flex-grow">
              <p className="text-4xl font-extrabold text-primary mb-4">${product.price.toFixed(2)}</p>
              
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {product.stock > 0 && (
                <div className="flex items-center space-x-4 mb-6">
                  <Label htmlFor="quantity" className="text-base">Quantity:</Label>
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10 rounded-r-none" aria-label="Decrease quantity">
                      <span className="text-xl">-</span>
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 h-10 text-center border-l border-r rounded-none focus-visible:ring-0"
                      min="1"
                      max={product.stock}
                    />
                     <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-l-none" aria-label="Increase quantity">
                       <span className="text-xl">+</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            
            <div className="mt-auto pt-4">
                 <Button 
                    size="lg" 
                    className="w-full text-lg" 
                    onClick={handleAddToCart} 
                    disabled={product.stock === 0 || quantity > product.stock}
                  >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </Button>
                 {quantity > product.stock && product.stock > 0 && (
                    <p className="text-destructive text-sm mt-2 text-center">
                        Requested quantity exceeds available stock ({product.stock}).
                    </p>
                )}
            </div>
          </div>
        </div>
      </Card>

      {/* Placeholder for related products or reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        {/* Add related products component here */}
        <p className="text-muted-foreground">More great items you might like.</p>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-muted">
            <Skeleton className="w-full aspect-[4/3] md:h-[500px]" />
          </div>
          <div className="p-6 md:p-8 space-y-4">
            <Skeleton className="h-6 w-1/4 rounded-md" /> {/* Category Badge */}
            <Skeleton className="h-10 w-3/4 rounded-md" /> {/* Title */}
            <Skeleton className="h-4 w-1/3 rounded-md" /> {/* Rating */}
            <Skeleton className="h-20 w-full rounded-md" /> {/* Description */}
            <Separator />
            <Skeleton className="h-12 w-1/3 rounded-md" /> {/* Price */}
            <Skeleton className="h-6 w-1/4 rounded-md" /> {/* Stock Status */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-1/4 rounded-md" /> {/* Quantity Input */}
            </div>
            <Skeleton className="h-12 w-full rounded-md" /> {/* Add to Cart Button */}
          </div>
        </div>
      </Card>
    </div>
  );
}
