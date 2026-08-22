"use client";

import { Card } from "@/components/ui/card";
import { FaCheckCircle, FaExclamationTriangle, FaTasks } from "react-icons/fa";
import { useTasksStore } from "@/app/hooks/useTaskStore";

type SingleCard = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

export default function StatCards() {
  const tasks = useTasksStore((state) => state.tasks);

  const totalTasks = tasks?.length ?? 0;
  const completedTasks =
    tasks?.filter((task) => task.status === "Done").length ?? 0;
  const highPriorityTasks =
    tasks?.filter((task) => task.priority === "High").length ?? 0;

  const stats: SingleCard[] = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <FaTasks />,
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: <FaCheckCircle />,
    },
    {
      title: "High Priority Tasks",
      value: highPriorityTasks,
      icon: <FaExclamationTriangle />,
    },
  ];

  return (
    <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6 mt-7 p-6">
      {stats.map((stat, index) => {
        return <SingleStatCard key={index} SingleCard={stat} />;
      })}
    </div>
  );
}

function SingleStatCard({ SingleCard }: { SingleCard: SingleCard }) {
  return (
    <Card className="flex flex-col rounded-sm justify-center gap-2 p-4">
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
