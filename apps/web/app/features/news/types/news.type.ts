export type NewsRespose = {
  articles: Article[];
};

export type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author?: string | null;
  content?: string | null;
};
