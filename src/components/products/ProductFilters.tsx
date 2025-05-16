"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { Category } from '@/types';
import { mockCategories } from '@/lib/mock-data'; // Using mock for available categories
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';

export interface Filters {
  category: string;
  priceMin: string;
  priceMax: string;
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  onResetFilters: () => void;
}

export default function ProductFilters({ filters, setFilters, onResetFilters }: ProductFiltersProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFilters(prev => ({ ...prev, category: value }));
  };

  return (
    <Card className="sticky top-20 shadow-sm">
      <CardHeader>
        <CardTitle>Filter Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" value={filters.category} onValueChange={handleSelectChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {mockCategories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              name="priceMin"
              placeholder="Min"
              value={filters.priceMin}
              onChange={handleInputChange}
              min="0"
            />
            <Input
              type="number"
              name="priceMax"
              placeholder="Max"
              value={filters.priceMax}
              onChange={handleInputChange}
              min="0"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            name="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => setFilters(prev => ({ ...prev, inStock: Boolean(checked) }))}
          />
          <Label htmlFor="inStock" className="cursor-pointer">In Stock Only</Label>
        </div>
        <Button onClick={onResetFilters} variant="outline" className="w-full">Reset Filters</Button>
      </CardContent>
    </Card>
  );
}
