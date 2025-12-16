import { withQuery } from "../../../services/domain";

export async function GET(request: Request) {
  // Extract query parameters from the request
  const { searchParams } = new URL(request.url);

  // Build base News API URL with default parameters
  const baseUrl = "https://newsapi.org/v2/top-headlines";
  const defaultParams = {
    country: "us",
    apiKey: "7036b09db7e64f24891a22c6e5ab54b9",
  };

  // Convert searchParams to a plain object
  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    // Map 'title' parameter to 'q' (query) parameter for News API
    if (key === "title") {
      queryParams["q"] = value;
    } else {
      queryParams[key] = value;
    }
  });

  // Merge default params with query params (query params take precedence)
  const params = { ...defaultParams, ...queryParams };

  // Build the final URL with all query parameters
  const newsApiUrl = withQuery(baseUrl, params);

  const response = await fetch(newsApiUrl);
  const data = await response.json();
  return Response.json(data);
}
