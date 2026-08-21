export type Label = "Bug" | "Feature" | "Documentation";
export type Priority = "Low" | "Medium" | "High";
export type Status = "Backlog" | "Todo" | "In Progress" | "Done" | "Canceled";

export type Task = {
  taskId: string;
  title: string;
  label: Label;
  isFavorite: boolean;
  priority: Priority;
  status: Status;
  createdAt: Date;
};

export const tasks: Task[] = [
  {
    taskId: "Task-001",
    title: "Fix login bug",
    label: "Bug",
    isFavorite: true,
    priority: "High",
    status: "In Progress",
    createdAt: new Date("2024-01-21t10:00:00Z"),
  },
  {
    taskId: "Task-002",
    title: "Add dark mode feature",
    label: "Feature",
    isFavorite: false,
    priority: "Medium",
    status: "Todo",
    createdAt: new Date("2024-01-21t12:00:00Z"),
  },
  {
    taskId: "Task-003",
    title: "Update API documentation",
    label: "Documentation",
    isFavorite: false,
    priority: "Low",
    status: "Backlog",
    createdAt: new Date("2024-01-21t09:00:00Z"),
  },
  {
    taskId: "Task-004",
    title: "Optimize database queries",
    label: "Feature",
    isFavorite: true,
    priority: "High",
    status: "In Progress",
    createdAt: new Date("2024-01-21t09:00:00Z"),
  },
  {
    taskId: "Task-005",
    title: "Fix UI alignment issues",
    label: "Bug",
    isFavorite: false,
    priority: "Medium",
    status: "Todo",
    createdAt: new Date("2024-01-21t09:00:00Z"),
  },
  {
    taskId: "Task-006",
    title: "Write user guide for new features",
    label: "Documentation",
    isFavorite: false,
    priority: "Low",
    status: "Backlog",
    createdAt: new Date("2024-01-21t09:00:00Z"),
  },
  {
    taskId: "Task-007",
    title: "Implement email notifications",
    label: "Feature",
    isFavorite: true,
    priority: "High",
    status: "Done",
    createdAt: new Date("2024-01-21t09:00:00Z"),
  },
  {
    taskId: "Task-008",
    title: "Fix broken links in documentation",
    label: "Documentation",
    isFavorite: false,
    priority: "Medium",
    status: "Canceled",
    createdAt: new Date("2024-01-21t09:00:00Z"),
  },
];
