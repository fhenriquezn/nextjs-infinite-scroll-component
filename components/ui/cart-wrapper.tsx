import { ReactNode } from "react";
import { getCart } from "@/actions/cart";
import { CartProvider } from "@/hooks/use-cart";

export async function CartWrapper({ children }: { children: ReactNode }) {
  const cart = getCart();
  return <CartProvider cartPromise={cart}>{children}</CartProvider>;
}
