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

type Status = {
  value: Task["label"];
};

const statuses: Status[] = [
  { value: "Bug" },
  { value: "Documentation" },
  { value: "Feature" },
];

export default function TaskLabel() {
  const [selectedStatus, setSelectedStatus] = useState<Task["label"]>("Bug");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="task-label" className="opacity-75 text-sm font-medium">
        Task Label
      </label>

      <Select
        value={selectedStatus}
        onValueChange={(value) => setSelectedStatus(value as Task["label"])}
      >
        <SelectTrigger className="w-full h-11! rounded-[6px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses.map((status, index) => (
              <SelectItem key={index} value={status.value}>
                <span>{status.value}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
