"use client";

import { flexRender, Table as TanStackTable } from "@tanstack/react-table";

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
import TableSkeleton from "../skeleton-loading";
import { Task } from "@/app/data/tasks-data";

interface TaskDataTableProps {
  table: TanStackTable<Task>;
  isLoading: boolean;
}

export function TaskDataTable({ table, isLoading }: TaskDataTableProps) {
  const deleteTask = useTasksStore((state) => state.deleteTask);

  function handleDeleteClick() {
    table
      .getFilteredSelectedRowModel()
      .rows.forEach((row) => deleteTask(row.original.taskId));
    table.resetRowSelection(false);
    toast.success("Task Deleted!", {
      description: "Operation completed successfully!",
    });
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex flex-col gap-7">
      {/* filtering and sorting part */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center flex-wrap gap-2">
          <SearchInput table={table} />
          <StatusDropDown table={table} />
          <PriorityDropDown table={table} />

          <Button
            variant={"ghost"}
            className="h-10 rounded-sm"
            onClick={() => table.resetColumnFilters()}
          >
            <span>Reset</span>
            <IoCloseSharp />
          </Button>
        </div>

        <div>
          <ViewColumnDropDown table={table} />
        </div>
      </div>

      {table.getFilteredSelectedRowModel().rows.length === 0 ? (
        ""
      ) : (
        <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:gap-5">
          {table.getFilteredSelectedRowModel().rows.length} Tasks Selected
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
      <div className="overflow-hidden rounded-sm border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
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
                  colSpan={table.getAllColumns().length}
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
