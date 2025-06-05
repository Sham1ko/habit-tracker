export interface Habit {
  id: string;
  title: string;
  description: string | null;
  frequency: string;
  createdAt: Date;
  activities: Activity[];
}

export interface Activity {
  id: string;
  date: Date;
  habitId: string;
}
