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
import { GoPlusCircle } from "react-icons/go";
import { Table } from "@tanstack/react-table";
import { priorityOptions } from "@/app/data/priority-options";

interface PriorityDropDownProps<TData> {
  table: Table<TData>;
}

export default function PriorityDropDown<TData>({
  table,
}: PriorityDropDownProps<TData>) {
  const [open, setOpen] = useState(false);

  const column = table.getColumn("priority");
  const selected = (column?.getFilterValue() as string[]) ?? [];

  const facetedCounts = column?.getFacetedUniqueValues();

  function toggleValue(value: string) {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    column?.setFilterValue(updated.length > 0 ? updated : undefined);
  }

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

            {selected.length > 0 && (
              <>
                <Separator
                  orientation="vertical"
                  className="h-5 border-gray-300 border"
                />
                <div className="flex items-center gap-2">
                  {priorityOptions
                    .filter((p) => selected.includes(p.value))
                    .map((p) => (
                      <Badge
                        key={p.value}
                        variant="secondary"
                        className="rounded-sm"
                      >
                        {p.label}
                      </Badge>
                    ))}
                </div>
              </>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 poppins w-52"
          side="bottom"
          align="center"
        >
          <Command>
            <CommandInput placeholder="Change Priority..." />
            <CommandList>
              <CommandEmpty>No priority found.</CommandEmpty>
              <CommandGroup>
                {priorityOptions.map((priority) => (
                  <CommandItem
                    key={priority.value}
                    value={priority.value}
                    className="flex justify-between"
                    onSelect={() => toggleValue(priority.value)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox checked={selected.includes(priority.value)} />
                      <priority.icon />
                      <span>{priority.label}</span>
                    </div>
                    <span>{facetedCounts?.get(priority.value) ?? 0}</span>
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
