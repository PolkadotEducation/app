"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { DataTablePagination } from "./dataTablePagination";
import { useToast } from "@/hooks/useToast";
import { duplicateLessons } from "@/api/lessonService";
import { useUser } from "@/hooks/useUser";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  updateData: () => Promise<void>;
}

export const DataTable = <TData, TValue>({ columns, data, updateData }: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const t = useTranslations("backoffice");
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { user } = useUser();
  const { toast } = useToast();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      sorting,
      columnFilters,
    },
  });

  // @TODO: Get teamId from selector
  const selectedTeamId = user?.teams?.length ? user?.teams[0].id : "";

  const handleDuplicateItems = async () => {
    const selectedIds = table.getSelectedRowModel().rows.map((row) => (row.original as { _id: string })._id);
    if (selectedIds.length <= 0) {
      toast({
        title: t("selectAtLeastOneLesson"),
        variant: "destructive",
      });
      return;
    }
    const resp = await duplicateLessons(selectedTeamId, selectedIds);
    if (resp) {
      await updateData();
      toast({
        title: t("lessonsDuplicatedSuccessfully"),
        variant: "default",
      });
      return;
    }
    toast({
      title: t("errorDuplicatingLessons"),
      variant: "destructive",
    });
  };

  return (
    <div className="rounded-md">
      <div className="flex xl:flex-row flex-col justify-between mb-4">
        <Input
          placeholder={t("searchLesson")}
          className="max-w-[500px]"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
        />
        <div className="flex gap-x-4 mt-4 xl:mt-0">
          <Button variant="outline" onClick={() => handleDuplicateItems()}>
            {t("duplicateItem")}
          </Button>
          <Button onClick={() => router.push("/backoffice/lessons/new")}>{t("newLesson")}</Button>
        </div>
      </div>
      <Table className="mb-4">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="h-[60px]">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      minWidth: header.column.columnDef.size,
                      maxWidth: header.column.columnDef.size,
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`${index % 2 !== 0 ? "bg-card" : "bg-primary/10"}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      minWidth: cell.column.columnDef.size,
                      maxWidth: cell.column.columnDef.size,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t("noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
};
