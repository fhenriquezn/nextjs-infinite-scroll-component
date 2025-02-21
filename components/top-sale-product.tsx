"use client";

import { Separator } from "@/components/ui/separator";
import { DummyProduct } from "@/types";
import { CountdownTimer } from "./ui/countdown-timer";
import { calculateDiscountedPrice, getFutureDate } from "@/lib/utils";
import Image from "next/image";

interface SaleItemProps {
  entry: DummyProduct;
}

export function TopSaleItem({ entry }: SaleItemProps) {
  const discountedPrice = calculateDiscountedPrice(entry);
  const savings = entry.price - discountedPrice;

  return (
    <>
      <div className="py-2">
        <div className="flex items-start gap-2">
          <Image
            src={entry.thumbnail}
            alt={entry.title}
            width={500}
            height={500}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{entry.title}</h4>
            <div className="mt-1">
              <div className="text-sm font-bold text-green-600">
                Save ${savings.toFixed(2)}
              </div>
              <div className="text-xs text-green-500">
                {entry.discountPercentage}% off
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <CountdownTimer endDate={getFutureDate()} />
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-sm">${entry.price}</div>
            <div className="text-xs text-muted-foreground line-through">
              ${discountedPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
