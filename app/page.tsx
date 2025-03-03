import { ShoppingBag } from "lucide-react";
import Sidebar from "./sidebar";
import Products from "@/components/products";
import { Suspense } from "react";
import { SearchParams } from "@/types";
import SearchForm from "@/components/search-form";
import { Cart } from "@/components/ui/cart";

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const q = searchParams.q ? String(searchParams?.q) : undefined;
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" />
              <h1 className="text-xl font-semibold">Store</h1>
            </div>
            <SearchForm q={q} />
            <Cart />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
              <Sidebar />
          </aside>

          <div className="lg:col-span-3">
            <Suspense fallback={<div>Loading...</div>}>
              <Products q={q} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
