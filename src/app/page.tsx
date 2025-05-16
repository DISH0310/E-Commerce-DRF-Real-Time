import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Package, RefreshCw, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Welcome to OrderStream
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto">
            Track your orders in real-time, browse our latest products, and manage your purchases with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/products" passHref legacyBehavior>
              <Button size="lg" className="text-lg">
                Shop Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login" passHref legacyBehavior>
              <Button size="lg" variant="outline" className="text-lg">
                Login to Track Orders
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-semibold text-center text-foreground mb-10">Why Choose OrderStream?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <RefreshCw className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mt-4 text-xl">Real-Time Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Stay informed with live tracking of your order status from processing to delivery.
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-accent/10 rounded-full">
                <Package className="h-10 w-10 text-accent" />
              </div>
              <CardTitle className="mt-4 text-xl">Wide Product Selection</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Explore a diverse range of high-quality products across various categories.
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="items-center">
              <div className="p-3 bg-primary/10 rounded-full">
                 <Truck className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="mt-4 text-xl">Reliable Delivery</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Efficient and dependable shipping to get your orders to you on time.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 bg-card rounded-lg shadow-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Discover Our Latest Collection</h2>
            <p className="text-muted-foreground mb-6">
              From cutting-edge electronics to must-read books and trendy apparel, find everything you need in one place. Our catalog is constantly updated with new and exciting items.
            </p>
            <Link href="/products" passHref legacyBehavior>
              <Button variant="accent" size="lg" className="text-lg">
                Explore Now
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="https://placehold.co/600x400.png?text=Featured+Products" 
              alt="Featured Products"
              data-ai-hint="products shopping"
              width={600} 
              height={400}
              className="rounded-lg shadow-md object-cover" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}
