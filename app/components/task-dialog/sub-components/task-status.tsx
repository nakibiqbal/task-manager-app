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
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";
import { useState } from "react";

type Status = {
  value: Task["status"];
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "Todo",
    icon: Circle,
  },
  {
    value: "In Progress",

    icon: ArrowUpCircle,
  },
  {
    value: "Done",
    icon: CheckCircle2,
  },
  {
    value: "Canceled",
    icon: XCircle,
  },
];
export function TaskStatus() {
  const [selectedStatus, setSelectedStatus] =
    useState<Task["status"]>("Backlog");

  const currentStatus = statuses.find((s) => s.value === selectedStatus);
  const CurrentIcon = currentStatus?.icon;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="task-status" className="opacity-75 text-sm font-medium">
        Task Status
      </label>
      <Select
        value={selectedStatus}
        onValueChange={(value) => setSelectedStatus(value as Task["status"])}
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
              <SelectItem key={index} value={status.value} className="py-2">
                <div className="flex items-center gap-2">
                  <status.icon size={15} />
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
