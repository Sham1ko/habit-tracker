import { createServerSupabaseClient } from "@/lib/supabase/server";
import prisma from "@/prisma/db";

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      title: true,
      description: true,
      frequency: true,
      createdAt: true,
      activities: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(habits), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH(request: Request) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const { id, ...data } = await request.json();

  const habit = await prisma.habit.update({
    where: { id, userId: user.id },
    data,
  });

  return new Response(JSON.stringify(habit), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
