import React from "react";
import { ProductCard } from "./product-card";
import InfiniteScroll from "./ui/infinite-scroll";
import { getProducts } from "@/actions/products";

const Products = async function () {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <InfiniteScroll
          loadMore={getProducts}
          searchParams={{ page: 1, batchSize: 15 }}
          ItemComponent={ProductCard}
        />
      </div>
    </>
  );
};

export default Products;
