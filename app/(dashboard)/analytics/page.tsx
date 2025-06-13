"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Habit } from "@/types/habit";
import { getAnalyticsStats } from "@/lib/analytics-utils";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import {
  Flame,
  LineChart,
  Target,
  TrendingUp,
  ListChecks,
  Trophy,
} from "lucide-react";

export default function AnalyticsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const fetchHabits = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/habits");
      if (!res.ok) throw new Error("Failed to fetch habits");
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const stats = getAnalyticsStats(habits);
  const calendarData = mapHabitsToCalendarData(habits);

  return (
    <main className="max-w-2xl w-full md:px-0 px-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <Button variant="outline" size="sm" onClick={fetchHabits}>
          Refresh
        </Button>
      </div>
      {loading ? (
        <Spinner size="large" />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : habits.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Add habits to see your analytics
          </p>
          <Link href="/habits/new">
            <Button>Add Your First Habit</Button>
          </Link>
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnalyticsCard
            title="Total Habits"
            value={stats.totalHabits}
            icon={TrendingUp}
          />
          <AnalyticsCard
            title="Total Check-ins"
            value={stats.totalCheckIns}
            icon={ListChecks}
          />
          <AnalyticsCard
            title="Overall Completion"
            value={`${stats.overallCompletionRate}%`}
            icon={Target}
          />
          <AnalyticsCard
            title="Longest Streak"
            value={stats.longestStreak}
            icon={Flame}
          />
          <AnalyticsCard
            title="Current Streak"
            value={stats.globalStreak}
            icon={Flame}
          />
          {stats.bestHabit && (
            <AnalyticsCard
              title={`Best Habit: ${stats.bestHabit.title}`}
              value={`${stats.bestHabit.completionRate}%`}
              icon={Trophy}
            />
          )}
          <AnalyticsCard
            title="Check-ins This Week"
            value={stats.checkInsThisWeek}
            icon={LineChart}
          />
        </div>
        <Card className="p-4">
          <ActivityCalendar
            data={calendarData}
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
        </Card>
        </>
      )}
    </main>
  );
}

function AnalyticsCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <Card className="p-4 flex items-center gap-4">
      <Icon className="w-6 h-6 text-primary" />
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-xl font-semibold">{value}</span>
      </div>
    </Card>
  );
}

function mapHabitsToCalendarData(habits: Habit[]) {
  const grouped: Record<string, number> = {};

  habits.forEach((habit) => {
    habit.activities.forEach((act) => {
      const dateStr = new Date(act.date).toISOString().split("T")[0];
      grouped[dateStr] = (grouped[dateStr] || 0) + 1;
    });
  });

  const currentYear = new Date().getFullYear();
  const lastDay = `${currentYear}-12-31`;
  grouped[lastDay] = grouped[lastDay] || 0;

  return Object.entries(grouped)
    .map(([date, count]) => ({
      date,
      count,
      level: Math.min(count, 4),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
