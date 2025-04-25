"use client";
import { Button } from "../../../components/ui/button";
import { logout } from "../../actions";
import { Switch } from "../../../components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createClient } from "../../../lib/supabase/client";

export default function SettingsPage() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
    };

    getUser();
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col max-w-2xl mx-auto space-y-4 mt-10 md:mt-20 md:px-0 px-4">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* User info */}
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">Logged in as:</p>
        <p className="font-medium">{userEmail || "Unknown user"}</p>
      </div>

      {/* Theme toggle */}
      <div className="flex items-center justify-between rounded-lg border p-4">
        <span className="text-sm font-medium">Dark mode</span>
        <Switch
          checked={resolvedTheme === "dark"}
          onCheckedChange={(val) => setTheme(val ? "dark" : "light")}
        />
      </div>

      <form action={logout} className="mt-auto">
        <Button
          type="submit"
          variant="destructive"
          className="w-full bg-red-400"
        >
          Log out
        </Button>
      </form>
    </div>
  );
}
