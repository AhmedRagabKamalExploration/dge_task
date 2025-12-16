import { withQuery } from "../../../services/domain";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const baseUrl = "https://newsapi.org/v2/top-headlines";
  const defaultParams = {
    country: "us",
    apiKey: "7036b09db7e64f24891a22c6e5ab54b9",
  };

  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key === "title") {
      queryParams["q"] = value;
    } else {
      queryParams[key] = value;
    }
  });

  const params = { ...defaultParams, ...queryParams };

  const newsApiUrl = withQuery(baseUrl, params);

  const response = await fetch(newsApiUrl);
  const data = await response.json();
  return Response.json(data);
}
