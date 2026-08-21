"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import TaskTitle from "./sub-components/task-title";
import { TaskStatus } from "./sub-components/task-status";
import TaskPriority from "./sub-components/task-priority";
import TaskLabel from "./sub-components/task-label";
import { taskFormSchema, TaskFormData } from "./task-dialog-schema";
import { useTasksStore } from "@/app/hooks/useTaskStore";

const emptyDefaults: TaskFormData = {
  title: "",
  status: "Backlog",
  priority: "Low",
  label: "Bug",
};

export default function TaskDialog() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const editingTask = useTasksStore((state) => state.editingTask);
  const setEditingTask = useTasksStore((state) => state.setEditingTask);
  const addTask = useTasksStore((state) => state.addTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const isLoading = useTasksStore((state) => state.isLoading);

  const isEditMode = !!editingTask;
  const open = isAddOpen || isEditMode; 

  // Connector of zod and react hook form
  const methods = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: isEditMode
      ? {
          title: editingTask.title,
          status: editingTask.status,
          priority: editingTask.priority,
          label: editingTask.label,
        }
      : emptyDefaults,
  });

  const { handleSubmit, reset } = methods;

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setEditingTask(null);
      setIsAddOpen(false);
      reset(emptyDefaults);
    } else {
      setIsAddOpen(true);
    }
  }

  async function onSubmit(data: TaskFormData) {
    if (isEditMode && editingTask) {
      await updateTask(editingTask.taskId, data);
      toast.success("Task updated!", {
        description: "Your changes have been saved.",
      });
    } else {
      await addTask(data);
      toast.success("Task added!", {
        description: "The new task has been created.",
      });
    }
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size="lg">Add New Task</Button>} />
      <DialogContent className="sm:max-w-sm max-w-4xl!">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isEditMode ? "Edit Task" : "Add New Task"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the task details below"
              : "Fill in the form to add a task"}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Dialog Content */}
            <div className="my-8 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-5">
                <TaskTitle />
                <TaskStatus />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <TaskPriority />
                <TaskLabel />
              </div>
            </div>

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Close</Button>} />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Saving..." : "Adding..."}
                  </>
                ) : isEditMode ? (
                  "Save changes"
                ) : (
                  "Add Task"
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
