import { http } from "../../../services/http";
import { getAPIUrl, withQuery } from "../../../services/domain";
import { ENDPOINT } from "../../../constant/endpoint.constant";
import { NewsRespose } from "../types/news.type";

export async function fetchNews(title = "") {
  const url = withQuery(getAPIUrl({ endpoint: ENDPOINT.news }), { title });
  const response = await http<NewsRespose>(url, { method: "GET" });
  return response.articles;
}
