import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Percent, Star } from 'lucide-react'
import React from 'react'

function Sidebar() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Quick Views</h2>
      <Accordion type="multiple" className="w-full space-y-4">
        <AccordionItem value="top-rated" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-4 hover:bg-muted/50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Top Rated</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pt-2 pb-4">
            <div className="space-y-3">
              {/* {topRatedProducts.map((product, index) => (
                <TopRatedItem 
                  key={product.id} 
                  product={product}
                  isLast={index === topRatedProducts.length - 1}
                />
              ))} */}
            </div>
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
            <div className="space-y-3">
              {/* {discountedProducts.map((product, index) => (
                <SaleItem 
                  key={product.id} 
                  product={product}
                  isLast={index === discountedProducts.length - 1}
                />
              ))} */}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default Sidebar