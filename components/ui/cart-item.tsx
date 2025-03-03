"use client";

import { Button } from "./button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { cartItem, product } from "@prisma/client";
import { useActionState } from "react";
import { updateCartItemAction } from "@/actions/cart";

interface CartItemProps {
  item: cartItem & { product: product };
}

export function CartItemComponent({ item }: CartItemProps) {
  const { productId, quantity } = item;
  const { updateCartItem } = useCart();
  const [, formAction] = useActionState(updateCartItemAction, null);

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-0">
      <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          className="object-cover"
          fill
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
        <p className="text-sm text-muted-foreground">
          ${item.product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <form
          action={async () => {
            updateCartItem(productId, "minus");
            formAction({ cartId: 1, productId, updateType: "minus" });
          }}
        >
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Minus className="h-3 w-3" />
          </Button>
        </form>

        <span className="w-6 text-center text-sm">{quantity}</span>
        <form
          action={async () => {
            updateCartItem(productId, "plus");
            formAction({ cartId: 1, productId, updateType: "plus" });
          }}
        >
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Plus className="h-3 w-3" />
          </Button>
        </form>
      </div>
      <form
        action={async () => {
          updateCartItem(productId, "delete");
          formAction({ cartId: 1, productId, updateType: "delete" });
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive"
          // onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
