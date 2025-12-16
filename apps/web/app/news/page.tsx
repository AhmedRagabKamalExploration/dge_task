import { fetchNews } from "../features/news/services/news.service";
import { NewsList } from "../features/news/components/news-list/news-list";
import { Suspense } from "react";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Latest News - Newsfeed App",
  description:
    "Browse the latest news articles and headlines from around the world. Search and filter articles by title.",
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const { title = "" } = await searchParams;
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="text-muted-foreground">Loading news...</div>
            </div>
          }
        >
          <NewsList newsPromise={fetchNews(title)} />
        </Suspense>
      </main>
    </div>
  );
}
