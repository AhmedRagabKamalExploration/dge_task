import { useSuspenseQuery } from "@tanstack/react-query";
import { newsQueryOptions } from "../queries/news.query";

export function useNews() {
  return useSuspenseQuery(newsQueryOptions());
}
