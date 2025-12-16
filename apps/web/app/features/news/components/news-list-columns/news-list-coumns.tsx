import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Article } from "../../types/news.type";
export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },

  {
    accessorKey: "urlToImage",
    header: () => <div className="text-right">Image</div>,
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.urlToImage}
          alt="Image"
          width={100}
          height={100}
        />
      );
    },
  },
];
