import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Article Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The article you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
        </div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 hover:underline font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News</span>
        </Link>
      </div>
    </div>
  );
}
