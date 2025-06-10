"use server";

import { createServerSupabaseClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import prisma from "../prisma/db";
import { revalidatePath } from "next/cache";

export async function logout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function login(_: unknown, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error };
  }

  return { error: null, user: data.user };
}

export async function signup(_: unknown, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function loginWithGoogle() {
  const supabase = await createServerSupabaseClient();

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });
}

export async function createHabit(_: unknown, formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const frequency = formData.get("frequency") as string;

  if (!title || !frequency) {
    return { error: "Title and frequency are required" };
  }

  try {
    const newHabit = await prisma.habit.create({
      data: {
        userId: user.id,
        title,
        description,
        frequency,
      },
    });

    await prisma.activity.create({
      data: {
        habitId: newHabit.id,
        // use UTC date to match completion logic
        date: getTodayUTC(),
      },
    });
  } catch (error) {
    console.error("Error creating habit:", error);
    return { error: "Error creating habit" };
  }

  redirect("/dashboard");
}

export async function markHabitAsCompleted(habitId: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const today = getTodayUTC();

  const exists = await prisma.activity.findFirst({
    where: {
      habitId,
      date: today,
    },
  });

  if (!exists) {
    await prisma.activity.create({
      data: {
        habitId,
        date: today,
      },
    });
  }

  revalidatePath("/dashboard");
}

function getTodayUTC(): Date {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  return new Date(Date.UTC(y, m, d));
}

export async function deleteHabit(habitId: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const habit = await prisma.habit.findUnique({
    where: { id: habitId },
  });

  if (!habit || habit.userId !== user.id) {
    throw new Error("Unauthorized or habit not found.");
  }

  await prisma.activity.deleteMany({
    where: {
      habitId,
    },
  });

  await prisma.habit.delete({
    where: {
      id: habitId,
    },
  });

  revalidatePath("/dashboard");

  return { success: true };
}
