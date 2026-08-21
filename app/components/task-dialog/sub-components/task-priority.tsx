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
import { IconType } from "react-icons";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { Controller, useFormContext } from "react-hook-form";
import { TaskFormData } from "../task-dialog-schema";

type PriorityOption = {
  value: Task["priority"];
  icon: IconType;
};

const priorities: PriorityOption[] = [
  { value: "Low", icon: IoArrowDown },
  { value: "Medium", icon: IoArrowBack },
  { value: "High", icon: IoArrowUp },
];

export default function TaskPriority() {
  const { control } = useFormContext<TaskFormData>();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="task-priority" className="opacity-75 text-sm font-medium">
        Task Priority
      </label>
      <Controller
        name="priority"
        control={control}
        render={({ field }) => {
          const currentPriority = priorities.find(
            (p) => p.value === field.value,
          );
          const CurrentIcon = currentPriority?.icon;

          return (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full h-11! rounded-[6px]">
                <SelectValue>
                  {CurrentIcon && <CurrentIcon size={15} />}
                  {field.value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {priorities.map((priority, index) => (
                    <SelectItem
                      key={index}
                      value={priority.value}
                      className="py-2"
                    >
                      <div className="flex items-center gap-2">
                        <priority.icon />
                        <span>{priority.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
}
