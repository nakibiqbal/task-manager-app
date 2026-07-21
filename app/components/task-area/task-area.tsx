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

export default function TaskArea() {
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

            <div>{/* dropdown view coloumn */}OK</div>
          </div>
        </CardHeader>
        <CardContent>{/* table */}</CardContent>
        <CardFooter>{/* pagination */}</CardFooter>
      </Card>
    </div>
  );
}
