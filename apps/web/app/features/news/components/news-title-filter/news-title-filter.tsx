"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

/**
 * Title filter input component that debounces user input and updates URL search params.
 * The component syncs with URL search params to handle external changes (e.g., browser back/forward).
 */
export function NewsTitleFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Get initial title from URL search params
  const urlTitle = searchParams.get("title") || "";
  const [titleValue, setTitleValue] = React.useState(urlTitle);
  
  // Store the last value we're about to set in the URL to prevent sync loops
  const pendingUrlValueRef = React.useRef<string | null>(null);

  // Sync local state with URL search params when they change externally
  // (e.g., browser back/forward, or other components updating the URL)
  React.useEffect(() => {
    const currentUrlTitle = searchParams.get("title") || "";
    
    // Skip sync if this is the value we just set (prevents rerender loop)
    if (pendingUrlValueRef.current === currentUrlTitle) {
      pendingUrlValueRef.current = null;
      return;
    }

    // Only update if the URL changed externally and differs from our state
    if (currentUrlTitle !== titleValue) {
      setTitleValue(currentUrlTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Debounce effect to update URL search params
  // Only runs when titleValue changes (not when searchParams change)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedValue = titleValue.trim();
      const currentUrlTitle = searchParams.get("title") || "";
      
      // Only update URL if the value actually changed
      if (trimmedValue !== currentUrlTitle) {
        // Mark this value as pending to prevent sync effect from running
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
        // Force server component to re-fetch data with new search params
        router.refresh();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [titleValue, router, pathname]);

  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search by title..."
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
    </div>
  );
}

