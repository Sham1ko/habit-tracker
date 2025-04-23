import AddTaskForm from "./add-task-form";
import {
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

export default function AddTaskDrawer() {
  return (
    <DrawerContent
      aria-description="Add a new habit"
      aria-describedby="add-habit"
    >
      <div className="mx-auto w-full max-w-sm min-h-screen">
        <DrawerHeader>
          <DrawerTitle>Create a New Habit</DrawerTitle>
        </DrawerHeader>

        <AddTaskForm />

        <DrawerFooter className="text-sm text-muted-foreground">
          Start building consistency 💪
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
