// app/data/options-options.ts
import { IconType } from "react-icons";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react";

export type StatusOption = {
  value: "Backlog" | "Todo" | "In Progress" | "Done" | "Canceled";
  label: string;
  icon: IconType;
};

export const statusOptions: StatusOption[] = [
  { value: "Backlog", label: "Backlog", icon: HelpCircle },
  { value: "Todo", label: "Todo", icon: Circle },
  { value: "In Progress", label: "In Progress", icon: ArrowUpCircle },
  { value: "Done", label: "Done", icon: CheckCircle2 },
  { value: "Canceled", label: "Canceled", icon: XCircle },
];
