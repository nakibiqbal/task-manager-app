"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IconType } from "react-icons";
import { GoPlusCircle } from "react-icons/go";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";

type Status = {
  value: string;
  label: string;
  icon: IconType;
};

const statuses: Status[] = [
  {
    value: "low",
    label: "Low",
    icon: IoArrowDown,
  },
  {
    value: "medium",
    label: "Medium",
    icon: IoArrowBack,
  },
  {
    value: "high",
    label: "High",
    icon: IoArrowUp,
  },
];

export default function PriorityDropDown() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  console.log(selectedStatus);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "flex justify-start px-5 border-dashed h-10 cursor-pointer dark:bg-black",
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GoPlusCircle />
              <span>Priority</span>
            </div>

            <Separator
              orientation="vertical"
              className="h-5 border-gray-300 border"
            />
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-sm">
                Low
              </Badge>
              <Badge variant="secondary" className="rounded-sm">
                Medium
              </Badge>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 poppins w-52"
          side="bottom"
          align="center"
        >
          {/* command component */}
          <Command>
            {/* command input */}
            <CommandInput placeholder="Change Priority..." />
            {/* command list of items */}
            <CommandList>
              <CommandEmpty>No priority found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    className="flex justify-between"
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null,
                      );
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {/* checkbox */}
                      <Checkbox />
                      {/* item icon */}
                      <status.icon />
                      {/* item label */}
                      <span>{status.label}</span>
                    </div>

                    <span>23</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
