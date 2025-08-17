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
import { EditHabitDialog } from "@/components/edit-habit-dialog";
import { Habit } from "@/types/habit";

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<{
    id: string;
    title: string;
    description: string | null;
  } | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

  const handleEditHabit = (habitId: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (habit) {
      setEditingHabit({
        id: habit.id,
        title: habit.title,
        description: habit.description,
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveHabit = async (
    habitId: string,
    data: { title: string; description: string }
  ) => {
    const response = await fetch("/api/habits", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: habitId,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update habit");
    }

    await refreshHabits();
  };

  return (
    <main className="max-w-2xl w-full md:px-0 px-4">
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
                You don&apos;t have any habits yet.
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
                onEdit={handleEditHabit}
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

      <EditHabitDialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setEditingHabit(null);
          }
        }}
        habit={editingHabit}
        onSave={handleSaveHabit}
      />
    </main>
  );
}
