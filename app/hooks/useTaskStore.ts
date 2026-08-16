import { create } from "zustand";
import { Task } from "@/app/data/tasks-data";

interface TasksStore {
  tasks: Task[] | null;
  setTasks: (tasks: Task[]) => void;
  toggleFavorite: (taskId: string) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: null,

  setTasks: (tasks) => set({ tasks }),

  toggleFavorite: (taskId) =>
    set((state) => ({
      tasks:
        state.tasks?.map((task) =>
          task.taskId === taskId
            ? { ...task, isFavorite: !task.isFavorite }
            : task,
        ) ?? null,
    })),
}));
