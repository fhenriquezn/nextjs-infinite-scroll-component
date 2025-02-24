"use server";

import { GET } from "@/lib/server-only";
import {
  SearchDummyProducts,
  InfiniteScrollParams,
  DummyProduct,
  PagedResult,
  SearchProductsParams,
} from "@/types";

export const getProducts = async (params: SearchProductsParams) => {
  console.log("getProducts", params);
  const url = `products/search?${params.q ? "q=" + params.q : ""}`;
  return await CallAPI(params, url);
};

export const getTopRatedProducts = async (params: InfiniteScrollParams) => {
  const url = `products?sortBy=rating&order=desc`;
  return await CallAPI(params, url);
};

export const getTopDiscountedProducts = async (
  params: InfiniteScrollParams
) => {
  const url = `products?sortBy=discountPercentage&order=desc`;
  return await CallAPI(params, url);
};

const CallAPI = async (params: SearchProductsParams, url: string) => {
  const skip = (params.page! - 2) * params.batchSize!;//Customizations to the original code, to match dummyjson API pagination
  url = `${url}&skip=${skip}&limit=${params.batchSize}`;
  console.log(url);
  const result = await GET<SearchDummyProducts>(url);
  var pagedResult: PagedResult<DummyProduct> = {
    items: [],
    total: 0,
    skip: 0,
    limit: 0,
  };

  if (result) {
    pagedResult = {
      items: result.products,
      total: result.total,
      skip: result.skip,
      limit: result.limit,
    };
  }
  return pagedResult;
};
