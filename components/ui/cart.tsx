"use client";

import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { useEffect, useState } from "react";
import { CartItemComponent } from "./cart-item";

export function Cart() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    alert("Checkout functionality would be implemented here");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cart.totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {cart.totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Your Cart</span>
            </SheetTitle>
            <SheetDescription />
            {cart.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                // onClick={clearCart}
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Add items to your cart to see them here
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="mt-4"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-1 py-4">
              <div className="space-y-1">
                {cart.items.map((item) => (
                  <CartItemComponent key={item.productId} item={item} />
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cart.subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
