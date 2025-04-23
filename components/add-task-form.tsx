import { createHabit } from "../app/actions";
import { useActionState } from "react";
import { Button } from "./ui/button";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
// import { DrawerFooter, DrawerHeader, DrawerTitle } from "./ui/drawer";

const initialState = { error: "" };

export default function AddTaskForm() {
  const [state, formAction] = useActionState(createHabit, initialState);

  return (
    <div className="space-y-4 p-4 pb-0">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Drink water" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Why this habit is important..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select name="frequency" required>
            <SelectTrigger>
              <SelectValue placeholder="Choose frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {state.error && <p className="text-sm text-red-500">{state.error}</p>}

        <Button type="submit" className="w-full mt-2">
          Create Habit
        </Button>
      </form>
    </div>
  );
}
