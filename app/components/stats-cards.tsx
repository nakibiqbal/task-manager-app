"use client";

import { Card } from "@/components/ui/card";
import { FaCheckCircle, FaExclamationTriangle, FaTasks } from "react-icons/fa";
import { Table } from "@tanstack/react-table";
import { Task } from "@/app/data/tasks-data";

type SingleCard = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function StatCards({ table }: { table: Table<Task> }) {
  const tasks = table.options.data;

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High",
  ).length;

  const stats: SingleCard[] = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <FaTasks />,
      onClick: () => table.resetColumnFilters(),
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: <FaCheckCircle />,
      onClick: () => table.getColumn("status")?.setFilterValue(["Done"]),
    },
    {
      title: "High Priority Tasks",
      value: highPriorityTasks,
      icon: <FaExclamationTriangle />,
      onClick: () => table.getColumn("priority")?.setFilterValue(["High"]),
    },
  ];

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6 pt-12">
      {stats.map((stat, index) => (
        <SingleStatCard key={index} SingleCard={stat} />
      ))}
    </div>
  );
}

function SingleStatCard({ SingleCard }: { SingleCard: SingleCard }) {
  return (
    <Card
      onClick={SingleCard.onClick}
      className="flex flex-col rounded-sm justify-center gap-2 p-4 cursor-pointer hover:bg-accent/50 transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-500">
          {SingleCard.title}
        </span>
        <div className="size-7 rounded-sm flex justify-center items-center bg-primary/25 text-primary">
          <span>{SingleCard.icon}</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold">{SingleCard.value}</h3>
    </Card>
  );
}
