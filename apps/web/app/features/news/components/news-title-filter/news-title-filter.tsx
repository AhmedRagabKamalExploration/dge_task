"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";

export function NewsTitleFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlTitle = searchParams.get("title") || "";
  const [titleValue, setTitleValue] = React.useState(urlTitle);

  const pendingUrlValueRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    const currentUrlTitle = searchParams.get("title") || "";

    if (pendingUrlValueRef.current === currentUrlTitle) {
      pendingUrlValueRef.current = null;
      return;
    }

    if (currentUrlTitle !== titleValue) {
      setTitleValue(currentUrlTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedValue = titleValue.trim();
      const currentUrlTitle = searchParams.get("title") || "";

      if (trimmedValue !== currentUrlTitle) {
        pendingUrlValueRef.current = trimmedValue;

        const params = new URLSearchParams(searchParams.toString());

        if (trimmedValue) {
          params.set("title", trimmedValue);
        } else {
          params.delete("title");
        }

        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;

        router.push(newUrl, { scroll: false });
        router.refresh();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [titleValue, router, pathname]);

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex-1 max-w-md">
        <label htmlFor="news-search" className="sr-only">
          Search news by title
        </label>
        <Input
          id="news-search"
          type="text"
          placeholder="Search articles by title..."
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
      </div>
      <button
        onClick={handleRefresh}
        disabled={isRefreshing}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Refresh news"
      >
        <RefreshCw
          className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
        />
        <span>Refresh</span>
      </button>
    </div>
  );
}
