"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "../news-list-columns/news-list-coumns";
import { Article } from "../../types/news.type";
import { NewsTitleFilter } from "../news-title-filter/news-title-filter";
import { generateArticleSlug } from "../../utils/article.utils";

export function NewsTable({ news }: { news: Article[] }) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: news,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="shrink-0 mb-6">
        <NewsTitleFilter />
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="rounded-lg border bg-card shadow-sm flex-1 min-h-0 flex flex-col overflow-hidden">
          <div className="overflow-y-auto flex-1">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="font-semibold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const article = row.original as Article;
                    const slug = generateArticleSlug(article.title);
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="cursor-pointer hover:bg-muted/50 transition-colors border-b"
                        onClick={() => router.push(`/news/${slug}`)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center text-muted-foreground"
                    >
                      No articles found. Try adjusting your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {table.getFilteredRowModel().rows.length > 0 && (
          <div className="flex items-center justify-between text-sm text-muted-foreground px-1 mt-2 shrink-0">
            <div>
              Showing {table.getFilteredRowModel().rows.length} article
              {table.getFilteredRowModel().rows.length !== 1 ? "s" : ""}
            </div>
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <div>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} selected
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
