import { prefetchQuery } from "../components/prefetch-server";
import { newsQueryOptions } from "../features/news/queries/news.query";

export default async function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Prefetch news data for all child pages
  await prefetchQuery(newsQueryOptions());

  return <div>{children}</div>;
}
