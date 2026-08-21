"use client";

import { Task } from "@/app/data/tasks-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { TaskFormData } from "../task-dialog-schema";

const labels: Task["label"][] = ["Bug", "Documentation", "Feature"];

export default function TaskLabel() {
  const { control } = useFormContext<TaskFormData>();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="task-label" className="opacity-75 text-sm font-medium">
        Task Label
      </label>
      <Controller
        name="label"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full h-11! rounded-[6px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {labels.map((label, index) => (
                  <SelectItem key={index} value={label} className="py-2">
                    <span>{label}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
