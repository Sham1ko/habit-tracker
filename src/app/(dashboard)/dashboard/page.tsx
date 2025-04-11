import { createClient } from "@/lib/supabase/server";
import prisma from "@/prisma/db";
import DashboardPage from "./DashboardPage";

export default async function DashboardPageWrapper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Можешь сделать редирект или вернуть что-то другое
    return <p className="text-center mt-10">Please log in</p>;
  }

  const habits = await prisma.habit.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      activities: true,
    },
  });

  return <DashboardPage habits={habits} />;
}
