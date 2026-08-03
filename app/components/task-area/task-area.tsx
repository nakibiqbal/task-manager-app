import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoCloseSharp } from "react-icons/io5";
// import PriorityDropDown from "../drop-down/priority-dropDown";
// import StatusDropDown from "../drop-down/status-dropDown";
// import { ViewColumnDropDown } from "../drop-down/view-columns-dropDown";
import { TaskDataTable } from "./tasks-data-table/tasks-data-table";
import { columns } from "./tasks-data-table/tasks-column";
import { tasks } from "@/app/data/tasks-data";

export default function TaskArea() {
  const data = tasks;

  return (
    <div className="px-7 mb-6">
      <Card>
        {/* <CardHeader> */}
        {/* <div className="flex justify-between items-center"> */}
        {/* <div className="flex items-center gap-2"> */}
        {/* <SearchInput table={table} /> */}
        {/* status drop down */}
        {/* <StatusDropDown /> */}
        {/* priority drop down */}
        {/* <PriorityDropDown /> */}

        {/* <Button variant={"ghost"} className="h-10">
                <span>Reset</span>
                <IoCloseSharp />
              </Button> */}
        {/* </div> */}

        {/* <div> */}
        {/* dropdown view coloumn */}
        {/* <ViewColumnDropDown /> */}
        {/* </div> */}
        {/* </div> */}
        {/* </CardHeader> */}
        <CardContent>
          {/* table */}
          <TaskDataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter>{/* pagination */}</CardFooter>
      </Card>
    </div>
  );
}
