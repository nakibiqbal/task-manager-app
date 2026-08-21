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
import { Table } from "@tanstack/react-table";
import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { statusOptions } from "@/app/data/status-options";

interface StatusDropDownProps<TData> {
  table: Table<TData>;
}

export default function StatusDropDown<TData>({
  table,
}: StatusDropDownProps<TData>) {
  const [open, setOpen] = useState(false);

  const column = table.getColumn("status");
  const selected = (column?.getFilterValue() as string[]) ?? [];

  const facetedCounts = column?.getFacetedUniqueValues();

  function toggleValue(value: string) {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    column?.setFilterValue(updated.length > 0 ? updated : undefined);
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "flex justify-start rounded-sm px-5 border-dashed h-10 cursor-pointer dark:bg-black",
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GoPlusCircle />
              <span>Status</span>
            </div>

            {selected.length > 0 && (
              <>
                <Separator
                  orientation="vertical"
                  className="h-5 border-gray-300 border"
                />

                <div className="flex items-center gap-2">
                  {statusOptions
                    .filter((s) => selected.includes(s.value))
                    .map((s) => (
                      <Badge
                        key={s.value}
                        variant="secondary"
                        className="rounded-sm"
                      >
                        {s.label}
                      </Badge>
                    ))}
                </div>
              </>
            )}
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
            <CommandInput placeholder="Change Status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statusOptions.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    className="flex justify-between"
                    onSelect={() => toggleValue(status.value)}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox checked={selected.includes(status.value)} />
                      <status.icon />
                      <span>{status.label}</span>
                    </div>
                    <span>{facetedCounts?.get(status.value) ?? 0}</span>
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

// PROBLEMMMM ---- STATUS SHOB GULA SELECT KORLE NO RESULTS DEKHACCHE
