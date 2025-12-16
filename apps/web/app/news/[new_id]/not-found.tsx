import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The article you're looking for doesn't exist or may have been removed.
      </p>
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to News</span>
      </Link>
    </div>
  );
}

