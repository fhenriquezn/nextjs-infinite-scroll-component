"use client";

import { Separator } from "@/components/ui/separator";
import { DummyProduct } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";

interface TopRatedItemProps {
  entry: DummyProduct;
}

export function TopRatedItem({ entry }: TopRatedItemProps) {
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
            <div className="flex items-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(entry.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs font-medium">{entry.rating}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-sm">${entry.price}</div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
