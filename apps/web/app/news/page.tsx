import { fetchNews } from "../features/news/services/news.service";
import { NewsList } from "../features/news/components/news-list/news-list";
import { Suspense } from "react";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ title: string }>;
}) {
  const { title } = await searchParams;
  return (
    <div className="container mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <NewsList newsPromise={fetchNews(title)} />
      </Suspense>
    </div>
  );
}
