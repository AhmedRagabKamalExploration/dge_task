import Image from "next/image";
import Link from "next/link";
import { Article } from "../../types/news.type";
import { formatDate } from "../../utils/article.utils";
import { ArrowLeft } from "lucide-react";

interface NewsDetailProps {
  article: Article;
}

export function NewsDetail({ article }: NewsDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-8">
          <div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to News</span>
            </Link>
          </div>

          <header className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm pb-6 border-b border-border">
              {article.source.name && (
                <span className="font-semibold text-foreground">
                  {article.source.name}
                </span>
              )}
              {article.author && (
                <span className="text-muted-foreground">
                  By{" "}
                  <span className="font-medium text-foreground">
                    {article.author}
                  </span>
                </span>
              )}
              {article.publishedAt && (
                <time
                  dateTime={article.publishedAt}
                  className="text-muted-foreground font-medium"
                >
                  {formatDate(article.publishedAt)}
                </time>
              )}
            </div>
          </header>

          {article.urlToImage && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted shadow-md border border-border">
              <Image
                src={article.urlToImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          {article.description && (
            <div className="pt-2">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                {article.description}
              </p>
            </div>
          )}

          {article.content && (
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <div className="text-base md:text-lg leading-7 text-foreground whitespace-pre-wrap">
                {article.content.replace(/\[\+[0-9]+ chars\]/g, "")}
              </div>
            </div>
          )}

          {article.url && (
            <div className="pt-6 border-t border-border">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline font-semibold transition-colors"
              >
                Read full article
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
