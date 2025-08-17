"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

function generateDemoData() {
  const days = 180;
  const today = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const data = [] as { date: string; count: number; level: number }[];
  for (let i = 0; i < days; i++) {
    const date = new Date(today.getTime() - (days - i - 1) * dayMs);
    const level = (i * 3) % 5;
    data.push({ date: date.toISOString().split("T")[0], count: level, level });
  }
  return data;
}

export function CalendarDemo() {
  const { resolvedTheme } = useTheme();
  const data = useMemo(() => generateDemoData(), []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Calendar Heatmap Demo
        </h2>
        <p className="max-w-[85%] text-muted-foreground sm:text-lg">
          Explore how your progress is visualized with a heatmap calendar.
        </p>
      </div>
      <div className="flex justify-center">
        {mounted ? (
          <ActivityCalendar
            data={data}
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
          <div className="h-[130px] w-full max-w-[428px]" />
        )}
      </div>
    </section>
  );
}

export default CalendarDemo;
