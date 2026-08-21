import { create } from "zustand";
import { Label, Task } from "@/app/data/tasks-data";
import { TaskFormData } from "../components/task-dialog/task-dialog-schema";

interface TasksStore {
  tasks: Task[] | null;
  editingTask: Task | null;
  isLoading: boolean;
  setTasks: (tasks: Task[]) => void;
  setEditingTask: (task: Task | null) => void;
  toggleFavorite: (clickedTaskId: string) => void;
  copyTask: (clickedTaskId: string) => void;
  deleteTask: (clickedTaskId: string) => void;
  updateLabel: (clickedTaskId: string, newLabel: Label) => void;
  addTask: (data: TaskFormData) => Promise<void>;
  updateTask: (taskId: string, data: TaskFormData) => Promise<void>;
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: null,
  editingTask: null,
  isLoading: false,

  setTasks: (tasks) => set({ tasks }),
  setEditingTask: (task) => set({ editingTask: task }),

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
      const nextNumber = state.tasks.length ? maxNumber + 1 : 1;

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

  // ADD STORE
  addTask: async (data) => {
    set({ isLoading: true });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    set((state) => {
      const tasks = state.tasks ?? [];

      const numbers = tasks.map((t) =>
        parseInt(t.taskId.replace("Task-", ""), 10),
      );
      const nextNumber = tasks.length ? Math.max(...numbers) + 1 : 1;
      const newTaskId = `Task-${String(nextNumber).padStart(3, "0")}`;

      const newTask: Task = {
        ...data,
        taskId: newTaskId,
        isFavorite: false,
        createdAt: new Date(),
      };

      return { tasks: [...tasks, newTask], isLoading: false };
    });
  },

  // EDIT STORE
  updateTask: async (taskId, data) => {
    set({ isLoading: true });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    set((state) => ({
      tasks:
        state.tasks?.map((task) =>
          task.taskId === taskId ? { ...task, ...data } : task,
        ) ?? null,
      isLoading: false,
      editingTask: null,
    }));
  },
}));
