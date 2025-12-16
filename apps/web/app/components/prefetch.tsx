"use client";

import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { QueryKey, QueryFunction, UseQueryOptions } from "@tanstack/react-query";

type QueryOptions<TData = unknown> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
} & Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;

interface PrefetchProps<TData = unknown> {
  /**
   * Query options to prefetch. Can be a single query options object or an array of query options.
   */
  queries: QueryOptions<TData> | QueryOptions<TData>[];
  /**
   * Optional children to render after prefetching
   */
  children?: React.ReactNode;
}

/**
 * Prefetch component that prefetches React Query queries on mount.
 * This component should be used in client components.
 * 
 * @example
 * ```tsx
 * <Prefetch queries={newsQueryOptions()}>
 *   <NewsContent />
 * </Prefetch>
 * ```
 * 
 * @example
 * ```tsx
 * <Prefetch queries={[newsQueryOptions(), otherQueryOptions()]} />
 * ```
 */
export function Prefetch<TData = unknown>({ queries, children }: PrefetchProps<TData>) {
  const queryClient = useQueryClient();

  // Memoize queries array to avoid unnecessary re-prefetches
  const queriesArray = useMemo(() => {
    return Array.isArray(queries) ? queries : [queries];
  }, [queries]);

  // Serialize query keys for stable dependency comparison
  const queryKeysString = useMemo(() => {
    return queriesArray.map((q) => JSON.stringify(q.queryKey)).join(",");
  }, [queriesArray]);

  useEffect(() => {
    const prefetchPromises = queriesArray.map((queryOptions) => {
      return queryClient.prefetchQuery({
        queryKey: queryOptions.queryKey,
        queryFn: queryOptions.queryFn,
        ...queryOptions,
      });
    });

    // Prefetch all queries in parallel
    Promise.all(prefetchPromises).catch((error) => {
      console.error("Error prefetching queries:", error);
    });
  }, [queryClient, queryKeysString, queriesArray]);

  return children ? <>{children}</> : null;
}

