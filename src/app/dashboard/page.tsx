import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>
        Logged in as: <strong>{user?.email}</strong>
      </p>

      <form action={logout}>
        <Button type="submit" variant="destructive">
          Log out
        </Button>
      </form>
    </main>
  );
}
