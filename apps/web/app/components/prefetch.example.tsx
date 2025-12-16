/**
 * Examples of how to use the Prefetch components
 * 
 * This file demonstrates both client-side and server-side prefetching.
 */

import { Prefetch } from "./prefetch";
import { prefetchQuery } from "./prefetch-server";
import { newsQueryOptions } from "../features/news/queries/news.query";

// ============================================
// Example 1: Client Component Usage
// ============================================
// Use the <Prefetch> component in client components
//
// "use client";
//
// export function NewsClientComponent() {
//   return (
//     <Prefetch queries={newsQueryOptions()}>
//       <NewsContent />
//     </Prefetch>
//   );
// }

// ============================================
// Example 2: Server Component Usage
// ============================================
// Use the prefetchQuery function in server components
//
// export default async function NewsPage() {
//   // Prefetch a single query
//   await prefetchQuery(newsQueryOptions());
//
//   // Or prefetch multiple queries
//   await prefetchQuery([
//     newsQueryOptions(),
//     // otherQueryOptions(),
//   ]);
//
//   return <NewsContent />;
// }

// ============================================
// Example 3: Prefetch Multiple Queries (Client)
// ============================================
// "use client";
//
// export function MultiplePrefetch() {
//   return (
//     <Prefetch queries={[newsQueryOptions(), otherQueryOptions()]}>
//       <Content />
//     </Prefetch>
//   );
// }

// ============================================
// Example 4: Prefetch in Layout (Server)
// ============================================
// export default async function NewsLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   await prefetchQuery(newsQueryOptions());
//   return <div>{children}</div>;
// }

