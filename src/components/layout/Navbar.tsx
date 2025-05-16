"use client";

import Link from 'next/link';
import { ShoppingCart, User, LogIn, LogOut, Package, ListOrdered, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation'; // Corrected import

export default function Navbar() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
          OrderStream
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/products" legacyBehavior passHref>
            <Button variant="ghost" className="text-sm md:text-base">
              <LayoutGrid className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> Products
            </Button>
          </Link>
          <Link href="/cart" legacyBehavior passHref>
            <Button variant="ghost" className="relative text-sm md:text-base">
              <ShoppingCart className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> Cart
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/orders" legacyBehavior passHref>
                <Button variant="ghost" className="text-sm md:text-base">
                  <ListOrdered className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> Orders
                </Button>
              </Link>
              <Link href="/profile" legacyBehavior passHref>
                <Button variant="ghost" className="text-sm md:text-base">
                  <User className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> Profile
                </Button>
              </Link>
            </>
          )}
          {loading ? (
             <Button variant="ghost" disabled className="text-sm md:text-base">Loading...</Button>
          ) : isAuthenticated ? (
            <Button onClick={handleLogout} variant="outline" className="text-sm md:text-base">
              <LogOut className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> Logout
            </Button>
          ) : (
            <Link href="/login" legacyBehavior passHref>
              <Button variant="default" className="text-sm md:text-base">
                <LogIn className="mr-1 h-4 w-4 md:mr-2 md:h-5 md:w-5" /> Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
