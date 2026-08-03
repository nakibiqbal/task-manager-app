// "use client";

// import * as React from "react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Columns3 } from "lucide-react";

// export function ViewColumnDropDown() {
//   const [showStatusBar, setShowStatusBar] = React.useState(true);
//   const [showActivityBar, setShowActivityBar] = React.useState(false);
//   const [showPanel, setShowPanel] = React.useState(false);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger
//         render={
//           <Button
//             variant="outline"
//             className="h-11 px-8 poppins dark:bg-black rounded-[6px]"
//           >
//             <Columns3 /> View
//           </Button>
//         }
//       />
//       <DropdownMenuContent
//         className="min-w-33 poppins rounded-[6px]"
//         align="end"
//       >
//         {/* <DropdownMenuGroup> */}
//         <DropdownMenuCheckboxItem
//           checked={showStatusBar}
//           onCheckedChange={setShowStatusBar}
//         >
//           Status
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem
//           checked={showActivityBar}
//           onCheckedChange={setShowActivityBar}
//         >
//           Priority
//         </DropdownMenuCheckboxItem>
//         <DropdownMenuCheckboxItem
//           checked={showPanel}
//           onCheckedChange={setShowPanel}
//         >
//           CreatedAt
//         </DropdownMenuCheckboxItem>
//         {/* </DropdownMenuGroup> */}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Columns3 } from "lucide-react";

export default function ViewColumnDropDown<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-11 px-8 poppins dark:bg-black rounded-[6px]"
          >
            <Columns3 /> Columns
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide() &&
              ["status", "priority", "createdAt"].includes(column.id),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
