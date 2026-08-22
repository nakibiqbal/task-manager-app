"use client";

import { useState } from "react";

import { useTasksStore } from "@/app/hooks/useTaskStore";
import TaskDialogForm from "./task-dialog-form";

export default function TaskDialog() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const editingTask = useTasksStore((state) => state.editingTask);
  const setEditingTask = useTasksStore((state) => state.setEditingTask);

  const isEditMode = !!editingTask;
  const open = isAddOpen || isEditMode;

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setEditingTask(null);
      setIsAddOpen(false);
    } else {
      setIsAddOpen(true);
    }
  }

  return (
    <TaskDialogForm
      key={editingTask?.taskId ?? "add"}
      open={open}
      onOpenChange={handleOpenChange}
      editingTask={editingTask}
    />
  );
}
