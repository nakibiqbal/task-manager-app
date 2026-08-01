import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
import PriorityDropDown from "../drop-down/priority-dropDown";
import StatusDropDown from "../drop-down/status-dropDown";
import { ViewColumnDropDown } from "../drop-down/view-columns-dropDown";
import { TaskDataTable } from "./tasks-data-table/tasks-data-table";
import { columns, Payment } from "./tasks-data-table/tasks-column";
// import { tasks } from "@/app/data/tasks-data";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "728ed52g",
      amount: 90,
      status: "pending",
      email: "b@example.com",
    },
    {
      id: "728ed52h",
      amount: 120,
      status: "pending",
      email: "c@example.com",
    },
  ];
}

export default async function TaskArea() {
  const data = await getData();

  return (
    <div className="px-7 mb-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SearchInput />
              {/* status drop down */}
              <StatusDropDown />
              {/* priority drop down */}
              <PriorityDropDown />

              <Button variant={"ghost"} className="h-10">
                <span>Reset</span>
                <IoCloseSharp />
              </Button>
            </div>

            <div>
              {/* dropdown view coloumn */}
              <ViewColumnDropDown />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* table */}
          <TaskDataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter>{/* pagination */}</CardFooter>
      </Card>
    </div>
  );
}
