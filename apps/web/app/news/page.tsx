import { fetchNews } from "../features/news/services/news.service";
import { NewsList } from "../features/news/components/news-list/news-list";
import { Suspense } from "react";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Latest News - Newsfeed App",
  description: "Browse the latest news articles and headlines from around the world. Search and filter articles by title.",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const { title = "" } = await searchParams;
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <div className="container mx-auto px-4 py-6 max-w-7xl w-full flex flex-col h-full items-center">
        <header className="text-center mb-6 shrink-0 w-full">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Latest News
          </h1>
          <p className="text-muted-foreground">
            Stay updated with the latest headlines from around the world
          </p>
        </header>
        <div className="flex-1 min-h-0 overflow-hidden w-full max-w-5xl">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-muted-foreground">Loading news...</div>
              </div>
            }
          >
            <NewsList newsPromise={fetchNews(title)} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
