"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityCalendar } from "react-activity-calendar";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";
import { markHabitAsCompleted } from "@/app/actions";
import { useState, useEffect } from "react";

function mapActivitiesToCalendarData(activities: { date: Date }[]) {
  const result: { date: string; count: number; level: number }[] = [];

  const grouped = activities.reduce((acc, act) => {
    const dateStr = new Date(act.date).toISOString().split("T")[0];
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const currentYear = new Date().getFullYear();
  //   const firstDay = `${currentYear}-01-01`;
  const lastDay = `${currentYear}-12-31`;

  //   grouped[firstDay] = grouped[firstDay] || 0;
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
  description: string | null; // 👈 обновлено
  activities: { date: Date }[];
};

export default function DashboardPage({ habits }: { habits: Habit[] }) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="max-w-2xl mx-auto mt-10 px-4 space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Habits</h1>
      </div>

      <Tabs defaultValue="current" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Habits</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 mt-4">
          {habits.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                You don’t have any habits yet.
              </p>
              <Link href="/habits/new">
                <Button>Add Your First Habit</Button>
              </Link>
            </div>
          ) : (
            habits.map((habit) => (
              <Card key={habit.id} className="p-4 gap-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{habit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {habit.description || "No description"}
                    </p>
                  </div>
                  <form
                    action={async () => {
                      await markHabitAsCompleted(habit.id);
                      router.refresh();
                    }}
                  >
                    <Button size="icon" variant="default">
                      <Check className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
                {mounted && (
                  <ActivityCalendar
                    data={mapActivitiesToCalendarData(habit.activities)}
                    colorScheme={
                      resolvedTheme === "light" || resolvedTheme === "dark"
                        ? resolvedTheme
                        : undefined
                    }
                    theme={{
                      light: [
                        "#e0e0e0",
                        "#a3d8a3",
                        "#78c78f",
                        "#4dbb7f",
                        "#26a65b",
                      ],
                      dark: [
                        "hsl(0, 0%, 22%)",
                        "#4dbb7f",
                        "#78c78f",
                        "#a3d8a3",
                        "#e0e0e0",
                      ],
                    }}
                  />
                )}
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="stats" className="space-y-4 mt-4">
          {habits.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Add habits to see your stats
              </p>
            </div>
          ) : (
            habits.map((habit) => (
              <Card key={habit.id} className="p-4">
                <p className="text-sm mb-1">{habit.title}</p>
                <Progress
                  value={Math.min(habit.activities.length * 10, 100)}
                  className="h-2"
                />
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
