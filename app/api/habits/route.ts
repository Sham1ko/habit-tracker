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
    orderBy: { createdAt: "desc" },
    include: {
      activities: true,
    },
  });

  return new Response(JSON.stringify(habits), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
