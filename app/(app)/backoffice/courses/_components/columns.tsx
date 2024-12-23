"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pen, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CourseType } from "@/types/courseTypes";

export const COLUMNS = ({ deleteHandler }: { deleteHandler: (_id: string) => void }): ColumnDef<CourseType>[] => {
  const router = useRouter();

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="h-4 w-4"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="h-4 w-4"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 10,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center cursor-pointer"
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
      enableSorting: true,
      size: 200,
    },
    {
      accessorKey: "language",
      header: ({ column }) => {
        return (
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center cursor-pointer"
          >
            Language
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        );
      },
      cell: ({ row }) => {
        const value = row.getValue("language") as string;
        return <Image src={`/assets/icons/${value}.svg`} alt={value} width={24} height={24} />;
      },
      enableSorting: true,
      size: 50,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;
        return (
          <div className="flex gap-x-4">
            <Button variant="ghost" onClick={() => router.push(`/backoffice/courses/${data._id}`)}>
              <Pen />
            </Button>
            <Button variant="ghost" onClick={() => deleteHandler(data._id || "")}>
              <Trash2 />
            </Button>
          </div>
        );
      },
      size: 50,
    },
  ];
};
