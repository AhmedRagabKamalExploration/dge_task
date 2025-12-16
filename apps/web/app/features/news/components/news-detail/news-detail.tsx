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
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to News</span>
      </Link>

      {/* Article Header */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          {article.source.name && (
            <span className="font-medium">{article.source.name}</span>
          )}
          {article.author && (
            <span>
              By <span className="font-medium">{article.author}</span>
            </span>
          )}
          {article.publishedAt && (
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          )}
        </div>
      </header>

      {/* Large Image */}
      {article.urlToImage && (
        <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden">
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

      {/* Description */}
      {article.description && (
        <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
          {article.description}
        </p>
      )}

      {/* Content */}
      {article.content && (
        <div className="prose prose-lg max-w-none mb-8">
          <div className="text-base leading-7 whitespace-pre-wrap">
            {article.content.replace(/\[\+[0-9]+ chars\]/g, "")}
          </div>
        </div>
      )}

      {/* Read More Link */}
      {article.url && (
        <div className="mt-8 pt-6 border-t">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
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
  );
}

