import { fetchNews } from "../features/news/services/news.service";
import { NewsList } from "../features/news/components/news-list/news-list";
import { Suspense } from "react";

// Force dynamic rendering to ensure search params are always fresh
export const dynamic = "force-dynamic";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const { title = "" } = await searchParams;
  return (
    <div className="mx-auto w-full h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <NewsList newsPromise={fetchNews(title)} />
      </Suspense>
    </div>
  );
}
