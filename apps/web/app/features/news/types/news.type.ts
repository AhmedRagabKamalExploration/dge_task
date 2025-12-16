export type NewsRespose = {
  articles: Article[];
};

export type Source = {
  id: string | null;
  name: string;
};

export type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: Source;
  author?: string | null;
  content?: string | null;
};
