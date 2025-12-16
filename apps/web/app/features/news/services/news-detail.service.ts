import { fetchNews } from "./news.service";
import { Article } from "../types/news.type";
import { findArticleBySlug } from "../utils/article.utils";

/**
 * Fetch a single article by slug
 * Since News API doesn't have a single article endpoint,
 * we fetch all articles and find the one matching the slug
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await fetchNews();
    const article = findArticleBySlug(articles, slug);
    return article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

