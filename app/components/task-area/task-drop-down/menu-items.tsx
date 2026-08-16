import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

export default function MenuItems({
  Icon,
  label,
  shortcut,
  className,
  variant,
  onClick,
}: {
  Icon: LucideIcon;
  label: string;
  shortcut: string;
  className?: string;
  variant?: "default" | "destructive";
  onClick?: () => void;
}) {
  return (
    <DropdownMenuItem className="py-2" variant={variant} onClick={onClick}>
      <Icon className={`${className}`} />
      <span className={`${className}`}>{label}</span>
      {shortcut && (
        <DropdownMenuShortcut className={`${className}`}>
          {shortcut}
        </DropdownMenuShortcut>
      )}
    </DropdownMenuItem>
  );
}
