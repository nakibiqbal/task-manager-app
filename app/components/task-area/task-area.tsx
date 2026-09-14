"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";

import { TaskDataTable } from "./tasks-data-table/tasks-data-table";
import { columns } from "./tasks-data-table/tasks-column";
import { tasks as staticTasks, Task } from "@/app/data/tasks-data";
import { useTasksStore } from "@/app/hooks/useTaskStore";
import StatCards from "../stats-cards";

export default function TaskArea() {
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(staticTasks);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const table = useReactTable<Task>({
    data: tasks ?? [],
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
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    if (!columnFilters.length) return;

    table.setPageIndex(0);
  }, [columnFilters, table]);

  return (
    <div className="px-7 mb-6 flex flex-col gap-12">
      <StatCards table={table} />

      <Card className="rounded-sm">
        <CardContent>
          <TaskDataTable table={table} isLoading={!tasks} />
        </CardContent>
      </Card>
    </div>
  );
}
