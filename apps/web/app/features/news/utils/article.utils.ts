import { Article } from "../types/news.type";

/**
 * Generate a URL-friendly slug from an article title
 */
export function generateArticleSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 100); // Limit length
}

/**
 * Find an article by slug in an array of articles
 */
export function findArticleBySlug(articles: Article[], slug: string): Article | undefined {
  return articles.find((article) => generateArticleSlug(article.title) === slug);
}

/**
 * Format date to a readable string
 */
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

