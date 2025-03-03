"use client";

import { CartAction, UpdateType } from "@/types";
import { cart, cartItem, product } from "@prisma/client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  use,
  useOptimistic,
  useMemo,
  useEffect,
  useCallback,
} from "react";

interface CartContextType {
  updateCart: (
    cart: cart & { items: (cartItem & { product: product })[] }
  ) => void;
  cart: cart & { items: (cartItem & { product: product })[] };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateItemCost(quantity: number, price: string): number {
  return Number(price) * quantity;
}

function updateCartItem(
  item: cartItem,
  updateType: UpdateType
): cartItem | null {
  if (updateType === "delete") return null;

  const newQuantity =
    updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  const singleItemAmount = Number(item.totalAmount) / item.quantity;
  const newTotalAmount = calculateItemCost(
    newQuantity,
    singleItemAmount.toString()
  );

  return {
    ...item,
    quantity: newQuantity,
    totalAmount: newTotalAmount,
  };
}

function createOrUpdateCartItem(
  existingItem: (cartItem & { product: product }) | undefined,
  product: product,
  cartId: number
): cartItem & { product: product } {
  const quantity = existingItem ? existingItem.quantity + 1 : 1;
  const totalAmount = calculateItemCost(quantity, product.price.toString());

  return {
    id: existingItem ? existingItem.id : 0,
    quantity: quantity,
    cartId: cartId,
    totalAmount: totalAmount,
    productId: product.id,
    product: product,
  };
}

function updateCartTotals(
  lines: (cartItem & { product: product })[]
): Pick<cart, "subTotal" | "totalQuantity" | "tax" | "total"> {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.totalAmount),
    0
  );
  return {
    subTotal: totalAmount,
    totalQuantity,
    tax: 0,
    total: totalAmount,
  };
}

function cartReducer(
  state: cart & { items: (cartItem & { product: product })[] },
  action: CartAction
): cart & { items: (cartItem & { product: product })[] } {
  switch (action.type) {
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const updatedLines = state.items
        .map((item) =>
          item.productId === merchandiseId
            ? updateCartItem(item, updateType)
            : item
        )
        .filter(Boolean) as (cartItem & { product: product })[];

      if (updatedLines.length === 0) {
        return {
          ...state,
          items: [],
          totalQuantity: 0,
          subTotal: state.subTotal,
          tax: state.tax,
          total: state.total,
        };
      }

      return {
        ...state,
        ...updateCartTotals(updatedLines),
        items: updatedLines,
      };
    }
    case "ADD_ITEM":
      const { product } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );
      const updatedItem = createOrUpdateCartItem(
        existingItem,
        product,
        state.id
      );
      const updatedLines = existingItem
        ? state.items.map((item) =>
            item.productId === existingItem.productId ? updatedItem : item
          )
        : [...state.items, updatedItem];
      return {
        ...state,
        ...updateCartTotals(updatedLines),
        items: updatedLines,
      };
    default:
      return state;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: ReactNode;
  cartPromise: Promise<cart & { items: (cartItem & { product: product })[] }>;
}) {
  const initialCart = use(cartPromise);
  const [cart, setCart] = useState<
    cart & { items: (cartItem & { product: product })[] }
  >(initialCart);

  const updateCart = useCallback(function (
    cart: cart & { items: (cartItem & { product: product })[] }
  ) {
    setCart(() => cart);
  }, []);

  const contextValue = useMemo(
    () => ({ cart, updateCart }),
    [cart, updateCart]
  );

  return (
    <CartContext.Provider
      value={contextValue}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    context.cart,
    cartReducer
  );

  const updateCartItem = useCallback((merchandiseId: number, updateType: UpdateType) => {
    updateOptimisticCart({
      type: "UPDATE_ITEM",
      payload: { merchandiseId, updateType },
    });
  }, [updateOptimisticCart]);

  const addCartItem = useCallback((product: product) => {
    updateOptimisticCart({ type: "ADD_ITEM", payload: { product } });
  }, [updateOptimisticCart]);

  useEffect(() => {
    context.updateCart(optimisticCart);
  }, [optimisticCart]);

  return useMemo(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
    }),
    [context.cart, updateCartItem, addCartItem]
  );
}
