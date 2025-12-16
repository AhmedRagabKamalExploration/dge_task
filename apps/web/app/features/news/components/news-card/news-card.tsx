import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { Article } from "../../types/news.type";
import { generateArticleSlug, formatDate } from "../../utils/article.utils";

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const slug = generateArticleSlug(article.title, article.publishedAt);

  return (
    <Link
      href={`/news/${slug}`}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {article.urlToImage ? (
          <>
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-muted">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col" style={{ padding: "1rem" }}>
        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
          {article.author && (
            <>
              <span className="h-1 w-1 rounded-full bg-border" />
              <div className="flex items-center gap-1 truncate max-w-[100px]">
                <User className="h-3 w-3" />
                <span className="truncate">{article.author}</span>
              </div>
            </>
          )}
        </div>

        <h3 className="mb-2 text-lg font-bold leading-tight tracking-tight text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.description && (
          <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs font-medium text-primary flex items-center gap-1 group/btn">
            Read Article
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
