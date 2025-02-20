"use server";

import { GET } from "@/lib/server-only";
import {
  SearchDummyProducts,
  InfiniteScrollParams,
  DummyProduct,
  PagedResult,
} from "@/types";

export const getProducts = async (params: InfiniteScrollParams) => {
  const skip = (params.page - 2) * params.batchSize;
  const url = `products?limit=${params.batchSize}&skip=${skip}`;
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
