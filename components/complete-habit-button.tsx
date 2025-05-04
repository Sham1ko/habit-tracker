import { Check, CheckCircle } from "lucide-react";
import { useTransition, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { markHabitAsCompleted } from "../app/actions";

export function CompleteHabitButton({
  habitId,
  onRefresh,
}: {
  habitId: string;
  onRefresh: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    startTransition(async () => {
      await markHabitAsCompleted(habitId);
      setCompleted(true);

      setTimeout(() => {
        setCompleted(false);
      }, 1500);
      onRefresh();
    });
  };

  return (
    <Button
      size="icon"
      variant={completed ? "secondary" : "default"}
      onClick={handleComplete}
      disabled={isPending}
      className={cn("transition-all duration-200", {
        "opacity-70 cursor-not-allowed": isPending,
      })}
      aria-label="Mark habit as completed"
      title="Mark as completed"
    >
      {completed ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <Check className="h-4 w-4" />
      )}
    </Button>
  );
}
