import { create } from "zustand";
import { Label, Task } from "@/app/data/tasks-data";

interface TasksStore {
  tasks: Task[] | null;
  setTasks: (tasks: Task[]) => void;
  toggleFavorite: (clickedTaskId: string) => void;
  copyTask: (clickedTaskId: string) => void;
  deleteTask: (clickedTaskId: string) => void;
  updateLabel: (clickedTaskId: string, newLabel: Label) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: null,

  setTasks: (tasks) => set({ tasks }),

  toggleFavorite: (clickedTaskId) =>
    set((state) => ({
      tasks:
        state.tasks?.map((task) =>
          task.taskId === clickedTaskId
            ? { ...task, isFavorite: !task.isFavorite }
            : task,
        ) ?? null,
    })),

  // COPY STORE
  copyTask: (clickedTaskId) =>
    set((state) => {
      if (!state.tasks) return {};

      const original = state.tasks?.find((t) => t.taskId === clickedTaskId);
      if (!original) return {};

      const number = state.tasks?.map((t) =>
        parseInt(t.taskId.replace("Task-", ""), 10),
      );

      const maxNumber = Math.max(...number);
      const nextNumber = maxNumber + 1;

      const newTaskId = `Task-${String(nextNumber).padStart(3, "0")}`;

      const baseTitle = original.title.replace(/\s*\(Copy\)$/, "");
      const newTask: Task = {
        ...original,
        taskId: newTaskId,
        title: `${baseTitle} (Copy)`,
      };
      return { tasks: [...state.tasks, newTask] };
    }),

  // DELETE STORE
  deleteTask: (clickedTaskId) =>
    set((state) => ({
      tasks: state.tasks?.filter((t) => t.taskId !== clickedTaskId) ?? null,
    })),

  // LABEL STORE
  updateLabel: (clickedTaskId, newLabel) =>
    set((state) => ({
      tasks:
        state.tasks?.map((task) =>
          task.taskId === clickedTaskId ? { ...task, label: newLabel } : task,
        ) ?? null,
    })),
}));
