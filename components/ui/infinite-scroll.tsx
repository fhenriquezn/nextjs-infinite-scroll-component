"use client";

import { PagedResult } from "@/types";
import React from "react";
import { Loading } from "@/components/ui/loading";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

interface InfiniteScrollProps<
  T,
  P extends { page?: number; batchSize?: number }
> {
  loadMore: (params: P) => Promise<PagedResult<T>>;
  isRefreshable?: boolean;
  searchParams?: P;
  ItemComponent: React.ComponentType<{ entry: T }>;
}

const DEFAULT_PAGE_SIZE = 15;
const DEFAULT_PAGE = 1;

const InfiniteScroll = <T, P extends { page?: number; batchSize?: number }>({
  loadMore,
  isRefreshable = false,
  searchParams = {} as P,
  ItemComponent,
}: InfiniteScrollProps<T, P>) => {
  searchParams = {
    ...searchParams,
    page: searchParams.page || DEFAULT_PAGE,
    batchSize: searchParams.batchSize || DEFAULT_PAGE_SIZE,
  };
  const { items, isLoading, hasMore, loadingRef, refresh } = useInfiniteScroll(
    loadMore,
    searchParams
  );

  const prevParamsRef = React.useRef(searchParams);

  const haveParamsChanged = React.useCallback(
    (prevParams: P, newParams: P): boolean => {
      const prevKeys = Object.keys(prevParams).filter((key) => key !== "page");
      const newKeys = Object.keys(newParams).filter((key) => key !== "page");

      if (prevKeys.length !== newKeys.length) return true;
      return prevKeys.some(
        (key) => prevParams[key as keyof P] !== newParams[key as keyof P]
      );
    },
    []
  );

  React.useEffect(() => {
    if (isRefreshable) {
      const prevParams = prevParamsRef.current;
      const paramsChanged = haveParamsChanged(prevParams, searchParams);
      if (paramsChanged) {
        refresh(searchParams);
        prevParamsRef.current = searchParams;
      }
    }
  }, [searchParams, isRefreshable, refresh, haveParamsChanged]);

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
