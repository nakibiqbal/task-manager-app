import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskTitle from "./sub-components/task-title";
import { TaskStatus } from "./sub-components/task-status";
import TaskPriority from "./sub-components/task-priority";
import TaskLabel from "./sub-components/task-label";

export default function TaskDialog() {
  return (
    <>
      <Dialog>
        <DialogTrigger render={<Button size="lg">Add New Task</Button>} />
        <DialogContent className="sm:max-w-sm max-w-4xl!">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Task</DialogTitle>
            <DialogDescription>
              Fill in the form to add a task
            </DialogDescription>
          </DialogHeader>

          {/* Dialog Content */}
          <div className="my-8 flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-5">
              <TaskTitle />
              <TaskStatus />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <TaskPriority />
              <TaskLabel />
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
