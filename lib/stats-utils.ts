import { Activity, Habit } from "@/types/habit";
import {
  startOfToday,
  subDays,
  isSameDay,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  isWithinInterval,
} from "date-fns";

export function calculateStreak(activities: Activity[]): number {
  if (!activities.length) return 0;

  const sortedDates = activities
    .map((a) => new Date(a.date))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 0;
  let currentDate = startOfToday();
  let index = 0;

  while (index < sortedDates.length) {
    if (isSameDay(currentDate, sortedDates[index])) {
      streak++;
      index++;
      currentDate = subDays(currentDate, 1);
    } else if (sortedDates[index] < currentDate) {
      index++;
    } else {
      break;
    }
  }

  return streak;
}

export function getCompletionRate(
  activities: Activity[],
  frequency: string,
  createdAt: Date
): number {
  if (!activities.length) return 0;

  const today = startOfToday();
  const interval = { start: new Date(createdAt), end: today };

  // Получаем все требуемые даты в зависимости от частоты
  const requiredDates = (() => {
    switch (frequency.toLowerCase()) {
      case "daily":
        return eachDayOfInterval(interval);
      case "weekly":
        return eachWeekOfInterval(interval);
      case "monthly":
        return eachMonthOfInterval(interval);
      default:
        return eachDayOfInterval(interval);
    }
  })();

  // Считаем количество выполненных активностей
  const completedDates = activities.filter((activity) =>
    isWithinInterval(new Date(activity.date), interval)
  ).length;

  // Вычисляем процент выполнения
  return Math.round((completedDates / requiredDates.length) * 100);
}

// Вспомогательная функция для получения статистики привычки
export function getHabitStats(habit: Habit) {
  const completionRate = getCompletionRate(
    habit.activities,
    habit.frequency,
    new Date(habit.createdAt)
  );
  const currentStreak = calculateStreak(habit.activities);
  const totalCheckIns = habit.activities.length;

  return {
    completionRate,
    currentStreak,
    totalCheckIns,
  };
}
