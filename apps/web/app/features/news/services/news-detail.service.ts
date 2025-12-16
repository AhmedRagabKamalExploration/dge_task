import { fetchNews } from "./news.service";
import { Article } from "../types/news.type";
import { findArticleBySlug } from "../utils/article.utils";
import { cache } from "react";

const getCachedNews = cache(async () => {
  return fetchNews();
});

const getCachedArticleBySlug = cache(async (slug: string) => {
  try {
    const articles = await getCachedNews();
    const article = findArticleBySlug(articles, slug);
    return article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
});

export async function fetchArticleBySlug(
  slug: string
): Promise<Article | null> {
  return getCachedArticleBySlug(slug);
}
