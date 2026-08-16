"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Star,
  HelpCircle,
  XCircle,
  CheckCircle2,
  ArrowUpCircle,
  Circle,
} from "lucide-react";

import { Priority, Status, Task } from "@/app/data/tasks-data";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { TaskDropDown } from "../task-drop-down/task-drop-down";

function renderStatusIcons(status: Status) {
  switch (status) {
    case "Backlog":
      return HelpCircle;
    case "Canceled":
      return XCircle;
    case "Done":
      return CheckCircle2;
    case "In Progress":
      return ArrowUpCircle;
    case "Todo":
      return Circle;
    default:
      break;
  }
}

function renderPriotiyIcons(priority: Priority) {
  switch (priority) {
    case "Low":
      return IoArrowDown;
    case "Medium":
      return IoArrowBack;
    case "High":
      return IoArrowUp;
    default:
      break;
  }
}

function formatDate(date: Date): string {
  // Extract date parts
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Add ordinal suffix
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} ${month} ${year}`;
}

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "taskId",
    header: "Task",
  },
  {
    accessorKey: "isFavorite",
    header: "",
    cell: ({ row }) => {
      const FavoriteIcon = row.original.isFavorite && Star;
      return FavoriteIcon && <FavoriteIcon size={14} />;
    },
  },
  {
    accessorKey: "title",
    // The hiding functionality is disabled for this column
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const taskLabel = row.original.label;
      const taskTitle = row.original.title;
      return (
        <div className="flex items-center gap-2">
          <Badge variant={"outline"}>{taskLabel}</Badge>
          <span>{taskTitle}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const StatusIcon = renderStatusIcons(row.original.status);
      const status = row.original.status;
      return (
        <div>
          {StatusIcon && (
            <div className="flex items-center gap-2 text-sm">
              <StatusIcon size={14} />
              <span>{status}</span>
            </div>
          )}
        </div>
      );
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const PriorityIcon = renderPriotiyIcons(row.original.priority);
      const priority = row.original.priority;
      return (
        <div>
          {PriorityIcon && (
            <div className="flex items-center gap-2 text-sm">
              <PriorityIcon size={14} />
              <span>{priority}</span>
            </div>
          )}
        </div>
      );
    },
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <span>{formatDate(createdAt)}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <TaskDropDown task={row.original} />,
  },
];
