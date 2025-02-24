"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DummyProduct } from "@/types";
import { SaleProductCard } from "./sale-product-card";
import Image from "next/image";

interface ProductCardProps {
  entry: DummyProduct;
}

export function ProductCard({ entry }: ProductCardProps) {
  return (
    <>
      {entry.discountPercentage > 5 ? (
        <SaleProductCard product={entry} />
      ) : (
        <Card className="flex flex-col h-full">
          <div className="relative aspect-square">
            <Image
              priority
              src={entry.thumbnail}
              alt={entry.title}
              width={500}
              height={500}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="flex-1 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">${entry.price}</span>
              <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-md">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium">{entry.rating}</span>
              </div>
            </div>

            {entry.stock < 10 && (
              <Badge variant="secondary" className="w-fit">
                <Package className="w-3 h-3 mr-1" />
                Only {entry.stock} left
              </Badge>
            )}

            <div>
              <h3 className="font-medium mb-1">{entry.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {entry.description}
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button
              size="sm"
              className="w-full hover:scale-[1.02] transition-transform"
              onClick={() => alert("Added to cart!")}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
