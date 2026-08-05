"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDots } from "react-icons/bs";
import { MENU_ITEMS } from "./constants";
import MenuItems from "./menu-items";
import { Trash } from "lucide-react";
import SubMenuLabel from "./sub-label-menu";
import { useState } from "react";

export function TaskDropDown() {
  const [position, setPosition] = useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-9 px-4 py-2 rounded-[6px]">
            <BsThreeDots className="h-4 w-4" />
          </Button>
        }
      />
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {MENU_ITEMS.map((item) => (
            <MenuItems
              key={item.label}
              Icon={item.icon}
              label={item.label}
              shortcut={item.shortcut}
            />
          ))}

          {/* sub menu */}
          <SubMenuLabel value={position} onValueChange={setPosition} />

          <DropdownMenuSeparator />
          <MenuItems
            Icon={Trash}
            label="Delete"
            shortcut="⌘Q"
            variant="destructive"
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
