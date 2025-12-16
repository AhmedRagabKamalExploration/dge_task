import { config } from "../config/config";

export function getAPIUrl({
  endpoint,
  extraUrl,
}: {
  endpoint: string;
  extraUrl?: string;
}) {
  if (extraUrl) {
    return extraUrl;
  }
  return `${config.apiUrl}/${config.apiVersion}/${endpoint}`;
}

/**
 * Adds query parameters to a URL.
 *
 * @param url - The base URL to add query parameters to
 * @param params - An object with key-value pairs to add as query parameters
 * @returns The URL with query parameters added
 *
 * @example
 * ```ts
 * withQuery('https://api.example.com/users', { page: 1, limit: 10 })
 * // Returns: 'https://api.example.com/users?page=1&limit=10'
 * ```
 *
 * @example
 * ```ts
 * withQuery('https://api.example.com/users?existing=param', { page: 1 })
 * // Returns: 'https://api.example.com/users?existing=param&page=1'
 * ```
 */
export function withQuery(
  url: string,
  params: Record<string, string | number | boolean | null | undefined>
): string {
  // Handle relative URLs (without protocol/host)
  if (url.startsWith("/") || !url.includes("://")) {
    const urlParts = url.split("?");
    const baseUrl = urlParts[0] || url;
    const existingQuery = urlParts[1] || "";
    const searchParams = new URLSearchParams(existingQuery);

    // Add or update query parameters
    Object.entries(params).forEach(([key, value]) => {
      // Skip null, undefined, or empty string values
      if (value !== null && value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  }

  // Handle absolute URLs
  const urlObj = new URL(url);
  const searchParams = new URLSearchParams(urlObj.search);

  // Add or update query parameters
  Object.entries(params).forEach(([key, value]) => {
    // Skip null, undefined, or empty string values
    if (value !== null && value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  urlObj.search = searchParams.toString();
  return String(urlObj);
}
