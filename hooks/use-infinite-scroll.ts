"use client";

import { PagedResult } from "@/types";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function useInfiniteScroll<
  T,
  P extends { page?: number; batchSize?: number }
>(loadMore: (params: P) => Promise<PagedResult<T>>, initialParams: P) {
  const [items, setItems] = useState<T[]>([]);
  const [params, setParams] = useState<P>(initialParams);
  const [page, setPage] = useState(params.page!);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(-1);
  const { ref, inView } = useInView({
    threshold: 0.5, // 50% of the element is visible
    rootMargin: "0px", // No margin around the root
  });

  const loadMoreItems = async () => {
    if (page >= totalPages && totalPages != -1) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      setParams((prev) => ({ ...prev, page: page }));
      const newItems = await loadMore({
        ...params,
        page: nextPage,
      });
      setItems((prev) => [...prev, ...newItems.items]);
      const calculatedTotalPages = Math.ceil(
        newItems.total / (params.batchSize || 1)
      );
      setPage(() => nextPage);
      setHasMore(() => nextPage < calculatedTotalPages);
      setTotalPages(() => calculatedTotalPages);
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refresh = async (newParams: Omit<P, "page">) => {
    setItems(() => []);
    setParams(() => ({ ...newParams, page: 1 } as P));
    setTotalPages(() => -1);
    setPage(() => 1);
    setIsLoading(() => true);
    setHasMore(() => true);
  };

  useEffect(() => {
    if (inView) loadMoreItems();
  }, [inView]);
  return {
    items,
    isLoading,
    hasMore,
    loadingRef: ref,
    page,
    refresh,
  };
}
