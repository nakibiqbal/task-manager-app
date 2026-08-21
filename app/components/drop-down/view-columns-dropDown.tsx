import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";

export default function ViewColumnDropDown<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-11 px-8 poppins dark:bg-black rounded-sm"
          >
            <Columns3 /> Columns
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="dark:bg-black">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() &&
              ["status", "priority", "createdAt"].includes(column.id),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
