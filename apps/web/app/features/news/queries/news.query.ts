import { ENDPOINT } from "../../../constant/endpoint.constant";
import { fetchNews } from "../services/news.service";
import { NewsRespose } from "../types/news.type";

export function newsQueryOptions() {
  return {
    queryKey: [ENDPOINT.news],
    queryFn: async () => {
      const articles = await fetchNews();
      return { articles } as NewsRespose;
    },
    select: (data: NewsRespose) => data.articles,
  };
}
