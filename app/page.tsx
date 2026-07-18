import NavBar from "./components/nav-bar";
import StatCards from "./components/stats-cards";
import TaskArea from "./components/task-area/task-area";

export default function Home() {
  return (
    <div className={`poppins min-h-screen bg-slate-50 dark:bg-black`}>
      <NavBar />
      <StatCards />
      <TaskArea />
    </div>
  );
}
