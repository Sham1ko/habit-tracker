"use client";

import { useActionState } from "react";
import { createHabit } from "@/app/actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const initialState = { error: "" };

export default function NewHabitPage() {
  const [state, formAction] = useActionState(createHabit, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl border-gray-100">
        <CardHeader>
          <CardTitle>Create a New Habit</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action={formAction} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Drink water"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Why this habit is important..."
              />
            </div>

            <div>
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

            {state.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}

            <Button type="submit" className="w-full mt-2">
              Create Habit
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground">
          Start building consistency 💪
        </CardFooter>
      </Card>
    </div>
  );
}
