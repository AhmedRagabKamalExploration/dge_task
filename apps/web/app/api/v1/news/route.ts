import { withQuery } from "../../../services/domain";

export async function GET(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    console.error("API_KEY environment variable is not set");
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  if (!apiKey || apiKey !== expectedApiKey) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const newsApiKey = process.env.NEWS_API_KEY;
  if (!newsApiKey) {
    return Response.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const baseUrl = "https://newsapi.org/v2/top-headlines";
  const defaultParams = {
    country: "us",
    apiKey: newsApiKey,
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
