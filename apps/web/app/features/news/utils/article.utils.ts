import { Article } from "../types/news.type";
import slugify from "slugify";

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36).substring(0, 6);
}

export function generateArticleSlug(
  title: string,
  publishedAt: string
): string {
  const titleSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  }).substring(0, 80);

  const dateHash = hashString(publishedAt);

  return `${titleSlug}-${dateHash}`;
}

export function findArticleBySlug(
  articles: Article[],
  slug: string
): Article | undefined {
  return articles.find(
    (article) =>
      generateArticleSlug(article.title, article.publishedAt) === slug
  );
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
