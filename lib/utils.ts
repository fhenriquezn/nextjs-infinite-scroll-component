import { DummyProduct } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFutureDateString = (minDays: number = 1, maxDays: number = 30) : string => {
  return getFutureDate(minDays, maxDays).toISOString();
};

export const getFutureDate = (minDays: number = 1, maxDays: number = 30) : Date => {
  const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const date = new Date();
  date.setDate(date.getDate() + randomDays);
  return date;
};

export function calculateDiscountedPrice(product: DummyProduct): number {
  return product.price - (product.price * product.discountPercentage) / 100;
}