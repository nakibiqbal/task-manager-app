"use client";

// import { Task } from "@/app/data/tasks-data";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Star,
  HelpCircle,
  XCircle,
  CheckCircle2,
  ArrowUpCircle,
  Circle,
} from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Priority, Status, Task } from "@/app/data/tasks-data";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { TaskDropDown } from "../task-drop-down/task-drop-down";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

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
    cell: () => <TaskDropDown />,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     // const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger
  //           render={
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           }
  //         />
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuGroup>
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuItem
  //             // onClick={() => navigator.clipboard.writeText(payment.id)}
  //             >
  //               Copy payment ID
  //             </DropdownMenuItem>
  //           </DropdownMenuGroup>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuGroup>
  //             <DropdownMenuItem>View customer</DropdownMenuItem>
  //             <DropdownMenuItem>View payment details</DropdownMenuItem>
  //           </DropdownMenuGroup>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
