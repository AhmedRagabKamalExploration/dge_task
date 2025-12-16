class HttpError {
  constructor(
    public message: string,
    public status: number
  ) {}
  toString() {
    return `HttpError: ${this.message} (Status: ${this.status})`;
  }
}

export async function http<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { config } = await import("../config/config");

  const headers = new Headers(options.headers);
  if (config.apiKey) {
    headers.set("x-api-key", config.apiKey);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new HttpError(response.statusText, response.status);
  }

  return response.json() as Promise<T>;
}
