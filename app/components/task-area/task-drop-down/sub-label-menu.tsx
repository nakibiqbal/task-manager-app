import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Tag } from "lucide-react";
import { LABEL_OPTIONS } from "./constants";

export default function SubMenuLabel({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="py-2">
        <Tag />
        Label
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="dark:bg-black rounded-sm">
          <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
            {LABEL_OPTIONS.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                <span className="relative left-5">{option}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
}
