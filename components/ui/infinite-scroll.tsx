'use client';

import { PagedResult } from "@/types";
import React from "react";
import { Loading } from "@/components/ui/loading";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

interface InfiniteScrollProps<
  T,
  P extends { page?: number; batchSize?: number }
> {
  loadMore: (params: P) => Promise<PagedResult<T>>;
  searchParams: P;
  ItemComponent: React.ComponentType<{ entry: T }>;
}

const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_PAGE = 0;

const InfiniteScroll = <T, P extends { page?: number; batchSize?: number }>({
  loadMore,
  searchParams,
  ItemComponent,
}: InfiniteScrollProps<T, P>) => {
  searchParams = {
    ...searchParams,
    page: searchParams.page || DEFAULT_PAGE,
    batchSize: searchParams.batchSize || DEFAULT_PAGE_SIZE,
  };
  const { items, isLoading, hasMore, loadingRef } = useInfiniteScroll(
    loadMore,
    searchParams
  );

  return (
    <>
      {items.map((entry, index) => (
        <ItemComponent key={index} entry={entry} />
      ))}
      {hasMore && (
        <div ref={loadingRef}>
          <Loading variant="settings" size="md" text="Loading more items..." />
        </div>
      )}
      {!hasMore && !isLoading && (
        <div className="py-4 text-center text-sm text-muted-foreground">
          No more items to load
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
