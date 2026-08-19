"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { MENU_ITEMS } from "./constants";
import MenuItems from "./menu-items";
import { Copy, Star, Trash } from "lucide-react";
import SubMenuLabel from "./sub-label-menu";
// import { useState } from "react";
import { Label, Task } from "@/app/data/tasks-data";
import { useTasksStore } from "@/app/hooks/useTaskStore";
import { toast } from "sonner";

export function TaskDropDown({ task }: { task: Task }) {
  // const [position, setPosition] = useState("bottom");
  const toggleFavorite = useTasksStore((state) => state.toggleFavorite);
  const copyTask = useTasksStore((state) => state.copyTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateLabel = useTasksStore((state) => state.updateLabel);

  function handleFavoriteClick() {
    toggleFavorite(task.taskId);
    toast.success("Task updated!", {
      description: "Operation completed successfully!",
    });
  }

  function handleCopyClick() {
    copyTask(task.taskId);
    toast.message("Task Copied!", {
      description: "Operation completed successfully!",
    });
  }

  function handleDeleteClick() {
    deleteTask(task.taskId);
    toast.success("Task Deleted!", {
      description: "Operation completed successfully!",
    });
  }

  function handleLabelChange(newLabel: string) {
    updateLabel(task.taskId, newLabel as Label);
    toast.success("Label updated!", {
      description: `Task label changed to ${newLabel}.`,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-9 px-4 py-2 rounded-[6px]">
            <BsThreeDots className="h-4 w-4" />
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {/* Favorite Task */}
          <MenuItems
            Icon={Star}
            label={task.isFavorite ? "Unfavorite" : "Favorite"}
            shortcut="⌘S"
            onClick={handleFavoriteClick}
          />
          {/* Copy Task */}
          <MenuItems
            Icon={Copy}
            label="Make a Copy"
            shortcut="⌘C"
            onClick={handleCopyClick}
          />

          {/* Baki item (Edit, Copy) — generic loop, ekhono kaj kore na */}
          {MENU_ITEMS.map((item) => (
            <MenuItems
              key={item.label}
              Icon={item.icon}
              label={item.label}
              shortcut={item.shortcut}
            />
          ))}

          {/* sub menu */}
          <SubMenuLabel value={task.label} onValueChange={handleLabelChange} />

          {/* Delete Task */}
          <DropdownMenuSeparator />
          <MenuItems
            Icon={Trash}
            label="Delete"
            shortcut="⌘Q"
            variant="destructive"
            onClick={handleDeleteClick}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
