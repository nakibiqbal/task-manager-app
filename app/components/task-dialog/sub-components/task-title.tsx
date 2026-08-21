"use client";

import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { TaskFormData } from "../task-dialog-schema";

export default function TaskTitle() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="task-title" className="opacity-75 text-sm font-medium">
        Task Title
      </label>
      <Input
        placeholder="Jhon Wick..."
        className="h-11 rounded-[6px]"
        {...register("title")}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </div>
  );
}
