"use client";

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters, { type Filters } from '@/components/products/ProductFilters';
import { mockProducts, mockCategories } from '@/lib/mock-data';
import type { Product } from '@/types';
import { Pagination } from '@/components/ui/pagination'; // Assuming a Pagination component exists or is created
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const initialFilters: Filters = {
    category: 'all',
    priceMin: '',
    priceMax: '',
    inStock: false,
  };
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setAllProducts(mockProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch = filters.category === 'all' || product.category.id === filters.category;
      const priceMinMatch = filters.priceMin === '' || product.price >= parseFloat(filters.priceMin);
      const priceMaxMatch = filters.priceMax === '' || product.price <= parseFloat(filters.priceMax);
      const stockMatch = !filters.inStock || product.stock > 0;
      return categoryMatch && priceMinMatch && priceMaxMatch && stockMatch;
    });
  }, [allProducts, filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };
  
  const resetFilters = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Our Products</h1>
        <p className="text-lg text-muted-foreground">Explore our collection of high-quality items.</p>
      </header>
      <Separator className="my-6"/>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilters filters={filters} setFilters={setFilters} onResetFilters={resetFilters} />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-muted-foreground">No products found</h2>
              <p className="text-foreground mt-2">Try adjusting your filters or check back later.</p>
            </div>
          )}
          {!isLoading && totalPages > 0 && (
             <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredProducts.length}
            />
          )}
        </main>
      </div>
    </div>
  );
}


function CardSkeleton() {
  return (
    <div className="border bg-card text-card-foreground shadow-sm rounded-lg p-4 space-y-3">
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-6 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-1/4 rounded-md" />
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}
