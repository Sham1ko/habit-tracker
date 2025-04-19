import { Check, CheckCircle } from "lucide-react";
import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { markHabitAsCompleted } from "@/app/actions";

export function CompleteHabitButton({ habitId }: { habitId: string }) {
  const [isPending, startTransition] = useTransition();
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleComplete = () => {
    startTransition(async () => {
      await markHabitAsCompleted(habitId);
      setCompleted(true);
      router.refresh();

      setTimeout(() => {
        setCompleted(false);
      }, 1500);
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
