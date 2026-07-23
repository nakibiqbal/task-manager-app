"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
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
import { CommandEmpty } from "cmdk";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { IconType } from "react-icons";
import { GoPlusCircle } from "react-icons/go";

type Status = {
  value: string;
  label: string;
  icon: IconType;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export default function StatusDropDown() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  console.log(selectedStatus);

  return (
    <div>
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
              <span>Status</span>
            </div>

            <Separator
              orientation="vertical"
              className="h-5 border-gray-300 border"
            />

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-sm">
                Todo
              </Badge>
              <Badge variant="secondary" className="rounded-sm">
                Done
              </Badge>
            </div>
          </div>
        </PopoverTrigger>

        {/* popover content */}
        <PopoverContent
          className="p-0 poppins w-68"
          side="bottom"
          align="center"
        >
          {/* command component  */}
          <Command>
            {/* command input */}
            <CommandInput placeholder="Change Status..." />

            {/* command lists */}
            <CommandList>
              {/* command empty */}
              <CommandEmpty>No results found.</CommandEmpty>
              {/* command group */}
              <CommandGroup>
                {/* command items */}

                {statuses.map((status) => {
                  return (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      onSelect={(value) => {
                        setSelectedStatus(
                          statuses.find((status) => status.value === value) ||
                            null,
                        );
                      }}
                      className="flex justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {/* checkbox  */}
                        <Checkbox />

                        {/* item icon */}
                        <status.icon />

                        {/* item label */}
                        <span>{status.label}</span>
                      </div>
                      <span>2</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
