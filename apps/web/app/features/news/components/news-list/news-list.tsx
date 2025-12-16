import { NewsRespose } from "../../types/news.type";
import { NewsTable } from "../new-table/new-table";

export async function NewsList({
  newsPromise,
}: {
  newsPromise: Promise<NewsRespose>;
}) {
  const news = await newsPromise;
  return <NewsTable news={news} />;
}
