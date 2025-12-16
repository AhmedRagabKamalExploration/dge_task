class HttpError {
  constructor(
    public message: string,
    public status: number
  ) {}
  toString() {
    return `HttpError: ${this.message} (Status: ${this.status})`;
  }
}

export async function http<T>(url: string, options: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return response.json() as Promise<T>;
  } catch (error: unknown) {
    throw error;
  }
}
