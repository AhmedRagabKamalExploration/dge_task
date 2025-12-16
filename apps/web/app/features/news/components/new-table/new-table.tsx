"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { Article } from "../../types/news.type";
import { NewsTitleFilter } from "../news-title-filter/news-title-filter";
import { NewsCard } from "../news-card/news-card";
import { columns } from "../news-list-columns/news-list-coumns";

export function NewsTable({ news }: { news: Article[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const data = React.useMemo(() => news, [news]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 12,
      },
    },
  });

  const { rows } = table.getRowModel();
  const filterValue = table
    .getState()
    .columnFilters.find((f) => f.id === "title")?.value as string | undefined;

  return (
    <div className="w-full flex flex-col items-center space-y-8 pb-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight">Top Headlines</h2>
          <p className="text-muted-foreground mt-1">
            Stay updated with the latest news from around the US.
          </p>
        </div>
        <div className="w-full md:w-72">
          <NewsTitleFilter />
        </div>
      </div>

      {rows.length > 0 ? (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rows.map((row) => (
            <NewsCard key={row.id} article={row.original} />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-2xl flex flex-col items-center justify-center py-20 text-center border rounded-2xl border-dashed bg-muted/30">
          <div className="rounded-full bg-muted p-4 mb-4">
            <svg
              className="h-8 w-8 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">No articles found</h3>
          <p className="text-muted-foreground max-w-sm mt-2">
            {filterValue
              ? `We couldn't find any articles matching "${filterValue}". Try a different search term.`
              : "No articles available at the moment."}
          </p>
        </div>
      )}

      {rows.length > 0 && (
        <div className="w-full max-w-6xl flex items-center justify-center py-4">
          <div className="flex items-center gap-3">
            <button
              className="px-5 py-2.5 text-sm font-medium border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-5 py-2.5 text-sm font-medium border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
