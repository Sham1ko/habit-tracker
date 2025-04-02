"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function AddHabitDrawer() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    // TODO: call server action or API
    console.log({ title, description });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="space-x-1">
          Add Habit
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="rounded-t-xl sm:max-w-lg mx-auto p-4 min-h-[70vh]"
      >
        <SheetHeader className="text-center p-2">
          <SheetTitle className="text-lg font-semibold">
            Create Habit
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Drink water"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why this habit is important..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select name="frequency" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>
            Create Habit
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
