import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "../../features/news/services/news-detail.service";
import { NewsDetail } from "../../features/news/components/news-detail/news-detail";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ new_id: string }>;
}) {
  const { new_id } = await params;
  const article = await fetchArticleBySlug(new_id);

  if (!article) {
    notFound();
  }

  return <NewsDetail article={article} />;
}
