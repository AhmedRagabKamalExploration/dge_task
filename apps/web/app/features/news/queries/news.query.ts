import { ENDPOINT } from "../../../constant/endpoint.constant";
import { fetchNews } from "../services/news.service";
import { NewsRespose } from "../types/news.type";

export function newsQueryOptions() {
  return {
    queryKey: [ENDPOINT.news],
    queryFn: fetchNews,
    select: (data: NewsRespose) => data.articles,
  };
}
