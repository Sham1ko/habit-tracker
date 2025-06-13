import { Habit } from "@/types/habit";
import { getHabitStats, calculateStreak } from "./stats-utils";
import { startOfToday, subDays, isWithinInterval } from "date-fns";

export interface AnalyticsStats {
  totalHabits: number;
  totalCheckIns: number;
  overallCompletionRate: number;
  longestStreak: number;
  /** Consecutive days with at least one check-in across all habits */
  globalStreak: number;
  checkInsThisWeek: number;
  bestHabit?: {
    id: string;
    title: string;
    completionRate: number;
  };
}

export function getAnalyticsStats(habits: Habit[]): AnalyticsStats {
  const totalHabits = habits.length;

  const totalCheckIns = habits.reduce(
    (sum, habit) => sum + habit.activities.length,
    0,
  );

  const overallCompletionRate = totalHabits
    ? Math.round(
        habits.reduce(
          (sum, habit) => sum + getHabitStats(habit).completionRate,
          0,
        ) / totalHabits,
      )
    : 0;

  const longestStreak = habits.reduce((max, habit) => {
    const streak = calculateStreak(habit.activities);
    return streak > max ? streak : max;
  }, 0);

  const globalStreak = calculateStreak(
    habits.flatMap((habit) => habit.activities),
  );

  let bestHabit: AnalyticsStats["bestHabit"];
  for (const habit of habits) {
    const rate = getHabitStats(habit).completionRate;
    if (!bestHabit || rate > bestHabit.completionRate) {
      bestHabit = { id: habit.id, title: habit.title, completionRate: rate };
    }
  }

  const today = startOfToday();
  const weekAgo = subDays(today, 6);
  const checkInsThisWeek = habits.reduce((count, habit) => {
    return (
      count +
      habit.activities.filter((a) =>
        isWithinInterval(new Date(a.date), { start: weekAgo, end: today }),
      ).length
    );
  }, 0);

  return {
    totalHabits,
    totalCheckIns,
    overallCompletionRate,
    longestStreak,
    globalStreak,
    checkInsThisWeek,
    bestHabit,
  };
}
