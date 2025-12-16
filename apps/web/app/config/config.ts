export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION ?? "v1",
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
};
