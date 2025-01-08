import { Search } from 'lucide-react'
import React from 'react'

function Products() {
    

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* {filteredProducts.map((product) =>
                product.discount ? (
                  <SaleProductCard key={product.id} product={product} />
                ) : (
                  <ProductCard key={product.id} product={product} />
                )
              )} */}
            </div>
            {[].length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground text-center">
                  No products found matching your search.
                </p>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Try adjusting your search terms or browse our categories.
                </p>
              </div>
            )}
    </>
  )
}

export default Products