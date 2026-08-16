"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TaskDataTable } from "./tasks-data-table/tasks-data-table";
import { columns } from "./tasks-data-table/tasks-column";
import { tasks as staticTasks } from "@/app/data/tasks-data";
import TableSkeleton from "./skeleton-loading";
import { useTasksStore } from "@/app/hooks/useTaskStore";

export default function TaskArea() {
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(staticTasks);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-7 mb-6">
      <Card>
        <CardContent>
          {!tasks ? (
            <TableSkeleton />
          ) : (
            <TaskDataTable columns={columns} data={tasks} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
