import { notFound } from "next/navigation";
import { fetchArticleBySlug } from "../../features/news/services/news-detail.service";
import { NewsDetail } from "../../features/news/components/news-detail/news-detail";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ new_id: string }>;
}): Promise<Metadata> {
  const { new_id } = await params;
  const article = await fetchArticleBySlug(new_id);

  if (!article) {
    return {
      title: "Article Not Found - Newsfeed App",
      description: "The article you're looking for doesn't exist or may have been removed.",
    };
  }

  const description = article.description
    ? article.description.substring(0, 160)
    : `Read the full article: ${article.title}`;

  return {
    title: `${article.title} - Newsfeed App`,
    description: description,
  };
}

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
