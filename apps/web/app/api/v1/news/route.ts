import { withQuery } from "../../../services/domain";

type NewsApiArticle = {
  title?: string;
  description?: string | null;
  urlToImage?: string | null;
  author?: string | null;
  publishedAt?: string;
  content?: string | null;
  [key: string]: unknown;
};

type NewsApiResponse = {
  articles: NewsApiArticle[];
  [key: string]: unknown;
};

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

  try {
    const response = await fetch(newsApiUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch news from external API" },
        { status: response.status }
      );
    }

    const data = (await response.json()) as NewsApiResponse;

    if (!data.articles || !Array.isArray(data.articles)) {
      return Response.json(
        { error: "Invalid response format from news API" },
        { status: 500 }
      );
    }

    const filteredArticles = data.articles.map((article: NewsApiArticle) => ({
      title: article.title ?? "",
      description: article.description ?? null,
      urlToImage: article.urlToImage ?? null,
      author: article.author ?? null,
      publishedAt: article.publishedAt ?? "",
      content: article.content ?? null,
    }));

    return Response.json(
      { articles: filteredArticles },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
