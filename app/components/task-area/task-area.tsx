"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TaskDataTable } from "./tasks-data-table/tasks-data-table";
import { columns } from "./tasks-data-table/tasks-column";
import { tasks as staticTasks, Task } from "@/app/data/tasks-data";
import TableSkeleton from "./skeleton-loading";

export default function TaskArea() {
  const [tasks, setTasks] = useState<Task[] | null>(null);

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
