import { Search, ShoppingBag } from "lucide-react";
import Sidebar from "./sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Products from "@/components/products";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <h1 className="text-xl font-semibold">Store</h1>
            </div>
            <div className="relative max-w-md w-full flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 w-full"
                />
              </div>
              <Button size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading...</div>}>
              <Products />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
