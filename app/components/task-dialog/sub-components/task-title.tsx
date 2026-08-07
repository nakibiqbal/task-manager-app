import { Input } from "@/components/ui/input";

export default function TaskTitle() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="task-title" className="opacity-75 text-sm font-medium">
        Task Title
      </label>
      <Input placeholder="Jhon Wick..." className="h-11 rounded-[6px]" />
    </div>
  );
}
