"use client";

import { Card } from "@/components/ui/card";
import { FaCheckCircle, FaExclamationTriangle, FaTasks } from "react-icons/fa";

type SingleCard = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

export default function StatCards() {
  const stats: SingleCard[] = [
    {
      title: "Total Tasks",
      value: 120,
      icon: <FaTasks />,
    },
    {
      title: "Completed Tasks",
      value: 80,
      icon: <FaCheckCircle />,
    },
    {
      title: "High Priority Tasks",
      value: 15,
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
    <Card className="flex flex-col justify-center gap-2 p-4">
      <div className="flex justify-between items-center">
        {/* card title */}
        <span className="text-sm font-semibold text-slate-500">
          {SingleCard.title}
        </span>
        {/* icon wrapper and the icon */}
        <div className="size-7 rounded-md flex justify-center items-center bg-primary/25 text-primary">
          <span>{SingleCard.icon}</span>
        </div>
      </div>

      {/* value */}
      <h3 className="text-3xl font-bold">{SingleCard.value}</h3>
    </Card>
  );
}
