"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import { ListTodo } from "lucide-react";

export default function NavBar() {
  return (
    <div className="flex relative bg-white dark:bg-black justify-between items-center w-full h-[92px] px-6 overflow-hidden border-b">
      <AppNameLogo />

      <div className="flex justify-center items-center gap-3">
        <Button size="lg">Add New Task</Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export function AppNameLogo() {
  return (
    <header className="flex gap-2 items-center">
      <div className="bg-primary size-9 rounded-md flex justify-center items-center">
        <ListTodo className="text-white" />
      </div>
      <h1 className="text-2xl font-semibold max-md:hidden">
        Task <span className="text-primary font-normal">Board</span>
      </h1>
    </header>
  );
}
