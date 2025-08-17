"use client";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { logout } from "@/app/actions";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const { setTheme, theme, resolvedTheme } = useTheme();
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

  const userInitial = useMemo(() => {
    if (!userEmail || userEmail.length === 0) return "U";
    return userEmail.charAt(0).toUpperCase();
  }, [userEmail]);

  if (!mounted) return null;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 md:px-6 mt-10 md:mt-16">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Logged in as</p>
                <p className="font-medium break-all">
                  {userEmail || "Unknown user"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Personalize your theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={(val) => setTheme(val)}>
                <SelectTrigger id="theme" className="w-full md:w-56">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Current: <span className="font-medium">{resolvedTheme}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Danger zone</CardTitle>
            <CardDescription>Sign out of your account</CardDescription>
          </CardHeader>
          <CardFooter>
            <form action={logout} className="w-full">
              <Button type="submit" variant="destructive" className="w-full">
                Log out
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
