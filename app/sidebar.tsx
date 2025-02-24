import { getTopDiscountedProducts, getTopRatedProducts } from "@/actions/products";
import { TopRatedItem } from "@/components/top-rated-product";
import { TopSaleItem } from "@/components/top-sale-product";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Percent, Star } from "lucide-react";
import React from "react";

function Sidebar() {
  return (
    <div className="sticky top-24">
      <h2 className="text-lg font-semibold mb-4">Quick Views</h2>
      <Accordion type="multiple" className="w-full space-y-4">
        <AccordionItem value="top-rated" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 hover:bg-muted/50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Top Rated</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                <InfiniteScroll
                  loadMore={getTopRatedProducts}
                  searchParams={{ page: 1, batchSize: 5 }}
                  ItemComponent={TopRatedItem}
                />
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="discounted" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 hover:bg-muted/50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-green-500" />
              <span>On Sale</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                <InfiniteScroll
                  loadMore={getTopDiscountedProducts}
                  searchParams={{ page: 1, batchSize: 5 }}
                  ItemComponent={TopSaleItem}
                />
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Sidebar;
