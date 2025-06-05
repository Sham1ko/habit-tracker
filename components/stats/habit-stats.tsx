import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Habit } from "@/types/habit";
import { getHabitStats } from "@/lib/stats-utils";
import { Badge } from "../ui/badge";
import { Flame, Target, TrendingUp } from "lucide-react";

interface HabitStatsProps {
  habit: Habit;
}

export function HabitStats({ habit }: HabitStatsProps) {
  const { completionRate, currentStreak, totalCheckIns } = getHabitStats(habit);

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{habit.title}</h3>
        <Badge variant="outline" className="text-xs">
          {habit.frequency}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-orange-500">
            <Flame className="w-4 h-4" />
            <span className="font-semibold">{currentStreak}</span>
          </div>
          <span className="text-xs text-muted-foreground">Current Streak</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-blue-500">
            <Target className="w-4 h-4" />
            <span className="font-semibold">{completionRate}%</span>
          </div>
          <span className="text-xs text-muted-foreground">Completion Rate</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-green-500">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">{totalCheckIns}</span>
          </div>
          <span className="text-xs text-muted-foreground">Total Check-ins</span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{completionRate}%</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>
    </Card>
  );
}
