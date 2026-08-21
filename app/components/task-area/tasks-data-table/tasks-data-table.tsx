"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import SearchInput from "../search-input";
import StatusDropDown from "../../drop-down/status-dropDown";
import PriorityDropDown from "../../drop-down/priority-dropDown";
import { IoCloseSharp } from "react-icons/io5";
import ViewColumnDropDown from "../../drop-down/view-columns-dropDown";
import { DataTablePagination } from "./data-table-pagination";
import { Trash, X } from "lucide-react";
import { useTasksStore } from "@/app/hooks/useTaskStore";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TaskDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const deleteTask = useTasksStore((state) => state.deleteTask);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });
  function handleDeleteClick() {
    table
      .getFilteredSelectedRowModel()
      .rows.forEach((row) =>
        deleteTask((row.original as { taskId: string }).taskId),
      );
    table.resetRowSelection(false);
    toast.success("Task Deleted!", {
      description: "Operation completed successfully!",
    });
  }
  return (
    <div className="flex flex-col gap-5">
      {/* filtering and sorting part */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SearchInput table={table} />
          {/* status drop down */}
          <StatusDropDown table={table} />
          {/* priority drop down */}
          <PriorityDropDown table={table} />

          <Button
            variant={"ghost"}
            className="h-10"
            onClick={() => table.resetColumnFilters()}
          >
            <span>Reset</span>
            <IoCloseSharp />
          </Button>
        </div>

        <div>
          {/* dropdown view coloumn */}
          <ViewColumnDropDown table={table} />
        </div>
      </div>

      {table.getFilteredSelectedRowModel().rows.length === 0 ? (
        ""   
      ) : (
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          {/* All task selector */}
          {table.getFilteredSelectedRowModel().rows.length} Tasks Selected
          {/* Delete all task together */}
          <Button
            className="px-3 bg-[#e11d48] hover:bg-[#8f142f] text-white"
            size="sm"
            disabled={table.getFilteredSelectedRowModel().rows.length === 0}
            onClick={handleDeleteClick}
          >
            <Trash />
            Delete All
          </Button>
          <Button
            className="px-3"
            variant="ghost"
            size="sm"
            onClick={() => table.resetRowSelection(false)}
          >
            <X />
            Clear Selection
          </Button>
        </div>
      )}

      {/* table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination controls */}
      <DataTablePagination table={table} />
    </div>
  );
}
