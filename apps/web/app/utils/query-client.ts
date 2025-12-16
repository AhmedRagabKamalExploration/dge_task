import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Get or create a QueryClient instance for server components.
 * Uses React's cache to ensure the same instance is used during a request.
 */
export const getQueryClient = cache(() => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
}));

