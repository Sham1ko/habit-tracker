"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { HabitCard } from "@/components/habit-card";
import { Spinner } from "@/components/ui/spinner";
import { HabitStats } from "@/components/stats/habit-stats";
import { Habit } from "@/types/habit";

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabits = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/habits", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch habits");

        const data = await res.json();
        setHabits(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Unable to load habits. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const refreshHabits = async () => {
    const res = await fetch("/api/habits");
    const data = await res.json();
    setHabits(data);
  };

  return (
    <main className="max-w-2xl mx-auto mt-20 space-y-4 md:px-0 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Habits</h1>
      </div>

      <Tabs defaultValue="current" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Habits</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 mt-4">
          {loading ? (
            <Spinner size="large" />
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : habits.length === 0 ? (
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
              <HabitCard
                key={habit.id}
                habit={habit}
                onRefresh={refreshHabits}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="stats" className="space-y-4 mt-4">
          {loading ? (
            <Spinner size="large" />
          ) : habits.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Add habits to see your stats
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habits.map((habit) => (
                  <HabitStats key={habit.id} habit={habit} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
