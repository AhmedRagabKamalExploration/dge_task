import { getQueryClient } from "../utils/query-client";
import type {
  QueryKey,
  QueryFunction,
  UseQueryOptions,
} from "@tanstack/react-query";

type QueryOptions<TQueryFnData = unknown, TData = TQueryFnData> = {
  queryKey: QueryKey;
  queryFn: QueryFunction<TQueryFnData>;
} & Omit<UseQueryOptions<TQueryFnData, Error, TData>, "queryKey" | "queryFn">;

/**
 * Server-side prefetch function that prefetches React Query queries.
 * This should be used in server components, server actions, or route handlers.
 *
 * @param queries - Query options to prefetch. Can be a single query options object or an array of query options.
 *
 * @example
 * ```tsx
 * // In a server component
 * export default async function NewsPage() {
 *   await prefetchQuery(newsQueryOptions());
 *   return <NewsContent />;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Prefetch multiple queries
 * await prefetchQuery([newsQueryOptions(), otherQueryOptions()]);
 * ```
 */
export async function prefetchQuery<
  TQueryFnData = unknown,
  TData = TQueryFnData,
>(
  queries:
    | QueryOptions<TQueryFnData, TData>
    | QueryOptions<TQueryFnData, TData>[]
): Promise<void> {
  const queryClient = getQueryClient();
  const queriesArray = Array.isArray(queries) ? queries : [queries];

  await Promise.all(
    queriesArray.map((queryOptions) =>
      queryClient.prefetchQuery({
        ...queryOptions,
      })
    )
  );
}
