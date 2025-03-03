"use server";

import prisma from "@/prisma/client";
import { UpdateType } from "@/types";
import { cart, cartItem, product } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const getCart = async (): Promise<
  cart & { items: (cartItem & { product: product })[] }
> => {
  let cart = await prisma.cart.findFirst({
    include: {
      items: {
        include: { product: true },
      },
    },
  });
  if (!cart) {
    await prisma.cart.create({
      data: {
        subTotal: 0,
        tax: 0,
        total: 0,
        totalQuantity: 0,
        items: { create: [] },
      },
    });
    cart = await prisma.cart.findFirst({
      include: {
        items: {
          include: { product: true },
        },
      },
    });
  }
  return cart!;
};

export async function addItem(
  prevState: any,
  { product, cartId }: { product: product; cartId: number }
) {
  console.log("Adding item to cart");
  await new Promise((resolve) => setTimeout(resolve, 4000));
  if (!product || !cartId) {
    return "Error adding item to cart";
  }
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    if (!cart) {
      return "Cart not found";
    }
    const existingItem = cart.items.find(
      (item) => item.productId === product.id
    );
    if (existingItem) {
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + 1,
          totalAmount: existingItem.totalAmount + existingItem.product.price,
        },
      });
      await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          subTotal: cart.subTotal + existingItem.product.price,
          total: cart.total + existingItem.product.price,
          totalQuantity: cart.totalQuantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          quantity: 1,
          totalAmount: product.price,
          productId: product.id,
          cartId: cartId,
        },
      });
      await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          subTotal: cart.subTotal + product.price,
          total: cart.total + product.price,
          totalQuantity: cart.totalQuantity + 1,
        },
      });
    }
  } catch (error) {
  } finally {
    // revalidatePath("/");
  }
}

export async function updateCartItemAction(
  prevState: any,
  {
    productId,
    updateType,
    cartId,
  }: { productId: number; updateType: UpdateType; cartId: number }
) {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        id: cartId,
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    if (!cart) {
      return "Cart not found";
    }
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );
    if (!existingItem) {
      return "Item not found";
    }
    const newQuantity =
      updateType === "plus"
        ? existingItem.quantity + 1
        : existingItem.quantity - 1;
    if (newQuantity === 0 || updateType === "delete") {
      await prisma.cartItem.delete({
        where: {
          id: existingItem.id,
        },
      });
      await prisma.cart.update({
        where: {
          id: prevState.cart.id,
        },
        data: {
          subTotal:
            updateType === "delete"
              ? cart.subTotal - existingItem.totalAmount * existingItem.quantity
              : cart.subTotal - existingItem.totalAmount,
          total:
            updateType === "delete"
              ? cart.total - existingItem.totalAmount * existingItem.quantity
              : cart.total - existingItem.totalAmount,
          totalQuantity:
            updateType === "delete"
              ? cart.totalQuantity - existingItem.quantity
              : cart.totalQuantity - 1,
        },
      });
    } else {
      const singleItemAmount = existingItem.totalAmount / existingItem.quantity;
      const newTotalAmount = singleItemAmount * newQuantity;
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: newQuantity,
          totalAmount: newTotalAmount,
        },
      });
      await prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          subTotal: cart.subTotal + singleItemAmount,
          total: cart.total + singleItemAmount,
          totalQuantity: cart.totalQuantity + 1,
        },
      });
    }
  } catch (error) {
  } finally {
    // revalidatePath("/");
  }
}
