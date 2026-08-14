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

// // async function getData(): Promise<Payment[]> {
// // Fetch data from your API here.
// // return [
// //   {
// //     id: "728ed52f",
// //     amount: 100,
// //     status: "pending",
// //     email: "m@example.com",
// //   },
// //   {
// //     id: "489e1d42",
// //     amount: 125,
// //     status: "processing",
// //     email: "a@gmail.com",
// //   },
// //   {
// //     id: "489e1d42",
// //     amount: 125,
// //     status: "processing",
// //     email: "b@gmail.com",
// //   },
// //   {
// //     id: "489e1d22",
// //     amount: 125,
// //     status: "success",
// //     email: "c@gmail.com",
// //   },
// //   {
// //     id: "489e1d45",
// //     amount: 125,
// //     status: "success",
// //     email: "d@gmail.com",
// //   },
// //   {
// //     id: "489e3d42",
// //     amount: 125,
// //     status: "failed",
// //     email: "e@gmail.com",
// //   },
// //   {
// //     id: "489e7d42",
// //     amount: 125,
// //     status: "processing",
// //     email: "f@gmail.com",
// //   },
// //   {
// //     id: "489e1t42",
// //     amount: 125,
// //     status: "processing",
// //     email: "g@gmail.com",
// //   },
// //   {
// //     id: "489g1d42",
// //     amount: 125,
// //     status: "failed",
// //     email: "h@gmail.com",
// //   },
// //   {
// //     id: "489u1d42",
// //     amount: 125,
// //     status: "success",
// //     email: "i@gmail.com",
// //   },
// // ];
// // }

// // export default function DemoPage() {
// //   // const data = await getData();
// //   const data = tasks;

// //   return (
// //     <div className="container mx-auto py-10">
// //       <DataTable columns={columns} data={data} />
// //     </div>
// //   );
// // }

//

// "use client";

// import { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   flexRender,
//   type ColumnDef,
//   type SortingState,
// } from "@tanstack/react-table";

// // 1. Define the shape of your data
// type Person = {
//   firstName: string;
//   lastName: string;
//   age: number;
// };

// // 2. Give your data a stable reference
// const data: Person[] = [
//   { firstName: "tanner", lastName: "linsley", age: 24 },
//   { firstName: "tandy", lastName: "miller", age: 40 },
//   { firstName: "joe", lastName: "dirte", age: 45 },
// ];

// // 3. Define your columns
// const columns: ColumnDef<Person>[] = [
//   {
//     accessorKey: "firstName",
//     header: "First Name",
//     cell: (info) => info.getValue(),
//   },
//   {
//     accessorFn: (row) => row.lastName,
//     id: "lastName",
//     header: () => <span>Last Name</span>,
//     cell: (info) => <i>{info.getValue<string>()}</i>,
//   },
//   {
//     accessorKey: "age",
//     header: () => "Age",
//   },
// ];

// export default function PersonTable() {
//   // 4. Sorting state — কোন কলাম, কোন দিকে sort হয়ে আছে সেটা মনে রাখার জায়গা
//   const [sorting, setSorting] = useState<SortingState>([]);

//   // 5. Create the table instance
//   const table = useReactTable({
//     columns,
//     data,
//     state: {
//       sorting, // table কে বলে দিচ্ছি এখন sorting state কী
//     },
//     onSortingChange: setSorting, // sort হলে state কীভাবে আপডেট হবে
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(), // sorting এর row model যোগ হলো
//   });

//   // 6. Render markup
//   return (
//     <table>
//       <thead>
//         {table.getHeaderGroups().map((headerGroup) => (
//           <tr key={headerGroup.id}>
//             {headerGroup.headers.map((header) => (
//               <th key={header.id}>
//                 {header.isPlaceholder ? null : (
//                   <div
//                     style={{
//                       cursor: header.column.getCanSort()
//                         ? "pointer"
//                         : undefined,
//                     }}
//                     onClick={header.column.getToggleSortingHandler()}
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext(),
//                     )}
//                     {{ asc: " 🔼", desc: " 🔽" }[
//                       header.column.getIsSorted() as string
//                     ] ?? null}
//                   </div>
//                 )}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody>
//         {table.getRowModel().rows.map((row) => (
//           <tr key={row.id}>
//             {row.getAllCells().map((cell) => (
//               <td key={cell.id}>
//                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
