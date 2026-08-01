import NavBar from "./components/nav-bar";
import StatCards from "./components/stats-cards";
import TaskArea from "./components/task-area/task-area";

// import { columns } from "./components/data-table-testing/columns";
// import { DataTable } from "./components/data-table-testing/data-table";
// import { tasks } from "./components/data-table-testing/taskData";

export default function Home() {
  return (
    <div className={`poppins min-h-screen bg-slate-50 dark:bg-black`}>
      <NavBar />
      <StatCards />
      <TaskArea />
    </div>
  );
}

// async function getData(): Promise<Payment[]> {
// Fetch data from your API here.
// return [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "a@gmail.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "b@gmail.com",
//   },
//   {
//     id: "489e1d22",
//     amount: 125,
//     status: "success",
//     email: "c@gmail.com",
//   },
//   {
//     id: "489e1d45",
//     amount: 125,
//     status: "success",
//     email: "d@gmail.com",
//   },
//   {
//     id: "489e3d42",
//     amount: 125,
//     status: "failed",
//     email: "e@gmail.com",
//   },
//   {
//     id: "489e7d42",
//     amount: 125,
//     status: "processing",
//     email: "f@gmail.com",
//   },
//   {
//     id: "489e1t42",
//     amount: 125,
//     status: "processing",
//     email: "g@gmail.com",
//   },
//   {
//     id: "489g1d42",
//     amount: 125,
//     status: "failed",
//     email: "h@gmail.com",
//   },
//   {
//     id: "489u1d42",
//     amount: 125,
//     status: "success",
//     email: "i@gmail.com",
//   },
// ];
// }

// export default function DemoPage() {
//   // const data = await getData();
//   const data = tasks;

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }
