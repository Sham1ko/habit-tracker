import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getAnalyticsStats } from "../lib/analytics-utils";
import { Habit } from "../types/habit";

const baseHabit = {
  description: null,
  frequency: "daily",
  createdAt: new Date("2023-01-01"),
};

describe("getAnalyticsStats", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2023-01-10"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("computes aggregated statistics", () => {
    const habits: Habit[] = [
      {
        ...baseHabit,
        id: "h1",
        title: "H1",
        activities: [
          { id: "a1", habitId: "h1", date: new Date("2023-01-09") },
          { id: "a2", habitId: "h1", date: new Date("2023-01-10") },
        ],
      },
      {
        ...baseHabit,
        id: "h2",
        title: "H2",
        activities: [{ id: "b1", habitId: "h2", date: new Date("2023-01-08") }],
      },
    ];

    const stats = getAnalyticsStats(habits);

    expect(stats.totalHabits).toBe(2);
    expect(stats.totalCheckIns).toBe(3);
    expect(stats.longestStreak).toBe(2);
    expect(stats.globalStreak).toBe(3);
    expect(stats.checkInsThisWeek).toBe(3);
    expect(stats.overallCompletionRate).toBe(15);
    expect(stats.bestHabit?.id).toBe("h1");
  });
});
