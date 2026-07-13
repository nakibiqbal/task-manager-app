import NavBar from "./components/nav-bar";
import StatCards from "./components/stats-cards";

export default function Home() {
  return (
    <div className={`poppins min-h-screen bg-slate-50 dark:bg-black`}>
      <NavBar />
      <StatCards />
    </div>
  );
}
