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
import { useState } from "react";
import { IconType } from "react-icons";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";

type Status = {
  value: Task["priority"];
  icon: IconType;
};

const statuses: Status[] = [
  {
    value: "Low",
    icon: IoArrowDown,
  },
  {
    value: "Medium",
    icon: IoArrowBack,
  },
  {
    value: "High",
    icon: IoArrowUp,
  },
];

export default function TaskPriority() {
  const [selectedStatus, setSelectedStatus] = useState<Task["priority"]>("Low");
  const currentStatus = statuses.find((s) => s.value === selectedStatus);
  const CurrentIcon = currentStatus?.icon;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="task-priority" className="opacity-75 text-sm font-medium">
        Task Priority
      </label>

      <Select
        value={selectedStatus}
        onValueChange={(value) => setSelectedStatus(value as Task["priority"])}
      >
        <SelectTrigger className="w-full h-11! rounded-[6px]">
          <SelectValue>
            {CurrentIcon && <CurrentIcon size={15} />}
            {selectedStatus}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses.map((status, index) => (
              <SelectItem key={index} value={status.value}>
                <div className="flex items-center gap-2">
                  <status.icon />
                  <span>{status.value}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
