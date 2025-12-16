import { Article } from "../../types/news.type";
import { NewsTable } from "../new-table/new-table";

export async function NewsList({
  newsPromise,
}: {
  newsPromise: Promise<Article[]>;
}) {
  const news = await newsPromise;
  return <NewsTable news={news} />;
}
