import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Article } from "../../types/news.type";

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.getValue("title")}</div>
    ),
  },

  {
    accessorKey: "urlToImage",
    header: () => <div className="text-right">Image</div>,
    cell: ({ row }) => {
      const article = row.original;
      return (
        <Image
          src={article.urlToImage || "/placeholder-image.jpg"}
          alt={article.title}
          width={100}
          height={100}
          className="object-cover rounded"
        />
      );
    },
  },
];
