import { prefetchQuery } from "../components/prefetch-server";
import { newsQueryOptions } from "../features/news/queries/news.query";
import { NewsRespose } from "../features/news/types/news.type";

export default async function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Prefetch news data for all child pages
  await prefetchQuery<NewsRespose>(newsQueryOptions());

  return <div>{children}</div>;
}
