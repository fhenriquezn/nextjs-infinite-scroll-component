"use client";

import { DummyProduct } from "@/types";
import { product } from "@prisma/client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { calculateDiscountedPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useActionState } from "react";
import { addItem } from "@/actions/cart";

interface SaleProductCardProps {
  product: DummyProduct;
}

export function SaleProductCard({ product }: SaleProductCardProps) {
  const { addCartItem } = useCart();
  const discountedPrice = calculateDiscountedPrice(product);
  const prod = {
    ...product,
    name: product.title,
    originalPrice: product.price,
    price: discountedPrice,
    discount: product.discountPercentage,
    image: product.thumbnail,
    saleEndsAt: null,
  } as product;
  const [, formAction] = useActionState(addItem, null);
    const addItemAction = formAction.bind(null, {
      product: prod,
      cartId: 1
    });

  return (
    <Card className="flex flex-col h-full">
      <div className="relative aspect-square">
        <Image
          priority
          src={product.thumbnail}
          alt={product.title}
          width={500}
          height={500}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-2 left-2 bg-red-500">
          {product.discountPercentage}% OFF
        </Badge>
      </div>
      <CardContent className="flex-1 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${product.price}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-md">
            <span className="text-yellow-500">★</span>
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        {product.stock < 10 && (
          <Badge variant="secondary" className="w-fit">
            <Package className="w-3 h-3 mr-1" />
            Only {product.stock} left
          </Badge>
        )}

        <div>
          <h3 className="font-medium mb-1">{product.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <form
          action={async () => {
            addCartItem(prod);
            addItemAction();
          }}
        >
          <Button
            size="sm"
            className="w-full hover:scale-[1.02] transition-transform"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
