import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Article } from "../../types/news.type";

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium text-base leading-snug pr-4">
        {row.getValue("title")}
      </div>
    ),
  },

  {
    accessorKey: "urlToImage",
    header: () => <div className="text-right">Image</div>,
    cell: ({ row }) => {
      const article = row.original;
      return (
        <div className="relative w-[120px] h-[80px] rounded-md overflow-hidden bg-muted shrink-0">
          <Image
            src={article.urlToImage || "/placeholder-image.jpg"}
            alt={article.title}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
      );
    },
  },
];
