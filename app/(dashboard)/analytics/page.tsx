"use client";

import { useEffect, useState } from "react";
import { Habit } from "@/types/habit";
import { getAnalyticsStats } from "@/lib/analytics-utils";
import { Spinner } from "@/components/ui/spinner";
import { Card } from "@/components/ui/card";
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

  useEffect(() => {
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

    fetchHabits();
  }, []);

  const stats = getAnalyticsStats(habits);

  return (
    <main className="max-w-2xl w-full md:px-0 px-4 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Analytics</h1>
      {loading ? (
        <Spinner size="large" />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
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
