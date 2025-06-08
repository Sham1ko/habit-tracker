"use client";

import { useActionState } from "react";
import { createHabit } from "@/app/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Target, Repeat, Sparkles } from "lucide-react";

const initialState = { error: "" };

export default function NewHabitPage() {
  const [state, formAction] = useActionState(createHabit, initialState);

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Create New Habit
          </h1>
          <p className="text-muted-foreground mt-2">
            Build consistency one day at a time
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-card/60 backdrop-blur-sm">
          <CardContent className="p-8">
            <form action={formAction} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="title"
                  className="text-base font-medium flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-primary" />
                  Habit Name
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Drink 8 glasses of water"
                  className="h-12 text-base border-2 focus:border-primary/50 transition-colors"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Choose a clear, specific habit name
                </p>
              </div>

              {/* Description Field */}
              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-medium">
                  Why this matters to you
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="This habit will help me stay healthy and energized throughout the day..."
                  className="min-h-[100px] text-base border-2 focus:border-primary/50 transition-colors resize-none"
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  Your motivation will keep you going on tough days
                </p>
              </div>

              {/* Frequency Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="frequency"
                  className="text-base font-medium flex items-center gap-2"
                >
                  <Repeat className="w-4 h-4 text-primary" />
                  How often?
                </Label>
                <Select name="frequency" required>
                  <SelectTrigger className="h-12 text-base border-2 focus:border-primary/50">
                    <SelectValue placeholder="Choose your frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily" className="text-base py-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Daily</div>
                          <div className="text-sm text-muted-foreground">
                            Every day
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="weekly" className="text-base py-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Weekly</div>
                          <div className="text-sm text-muted-foreground">
                            Once a week
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="monthly" className="text-base py-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div className="font-medium">Monthly</div>
                          <div className="text-sm text-muted-foreground">
                            Once a month
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Error Display */}
              {state.error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">
                    {state.error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Create My Habit
              </Button>
            </form>
          </CardContent>

          <CardFooter className="px-8 pb-8 pt-0">
            <div className="w-full text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                🌟 Start your journey to better habits today
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>🎯 Stay focused</span>
                <span>•</span>
                <span>📈 Track progress</span>
                <span>•</span>
                <span>💪 Build consistency</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
