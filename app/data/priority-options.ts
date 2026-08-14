// app/data/priority-options.ts
import { IconType } from "react-icons";
import { IoArrowBack, IoArrowDown, IoArrowUp } from "react-icons/io5";

export type PriorityOption = {
  value: "Low" | "Medium" | "High";
  label: string;
  icon: IconType;
};

export const priorityOptions: PriorityOption[] = [
  { value: "Low", label: "Low", icon: IoArrowDown },
  { value: "Medium", label: "Medium", icon: IoArrowBack },
  { value: "High", label: "High", icon: IoArrowUp },
];
