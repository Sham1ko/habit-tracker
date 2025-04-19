"use client";

import { Check, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { markHabitAsCompleted } from "@/app/actions";
import { CompleteHabitButton } from "./complete-habit-button";

function mapActivitiesToCalendarData(activities: { date: Date }[]) {
  const result: { date: string; count: number; level: number }[] = [];

  const grouped = activities.reduce((acc, act) => {
    const dateStr = new Date(act.date).toISOString().split("T")[0];
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const currentYear = new Date().getFullYear();
  const lastDay = `${currentYear}-12-31`;
  grouped[lastDay] = grouped[lastDay] || 0;

  for (const [date, count] of Object.entries(grouped)) {
    result.push({
      date,
      count,
      level: Math.min(count, 4),
    });
  }

  return result.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

type Habit = {
  id: string;
  title: string;
  description: string | null;
  activities: { date: Date }[];
};

export function HabitCard({
  habit,
  onEdit,
  onDelete,
}: {
  habit: Habit;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card className="p-4 gap-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{habit.title}</h3>
          <p className="text-sm text-muted-foreground">
            {habit.description || "No description"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CompleteHabitButton habitId={habit.id} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(habit.id)} disabled>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(habit.id)}
                className="text-red-600 focus:text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4">
        {mounted ? (
          <ActivityCalendar
            data={mapActivitiesToCalendarData(habit.activities)}
            colorScheme={
              resolvedTheme === "light" || resolvedTheme === "dark"
                ? resolvedTheme
                : undefined
            }
            theme={{
              light: ["#e0e0e0", "#a3d8a3", "#78c78f", "#4dbb7f", "#26a65b"],
              dark: [
                "hsl(0, 0%, 22%)",
                "#4dbb7f",
                "#78c78f",
                "#a3d8a3",
                "#e0e0e0",
              ],
            }}
          />
        ) : (
          <Skeleton className="w-full h-[161px] rounded-md" />
        )}
      </div>
    </Card>
  );
}
