import { createServerSupabaseClient } from "../../../lib/supabase/server";
import DashboardPage from "./DashboardPage";

export default async function DashboardPageWrapper() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="text-center mt-10">Please log in</p>;
  }

  return <DashboardPage />;
}
