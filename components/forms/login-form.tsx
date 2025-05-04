"use client";

import { login, loginWithGoogle } from "@/app/actions";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";

export default function LoginForm() {
  const { setUser } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        const res = await login(undefined, formData);

        if (res.error) {
          setError(res.error.message);
        } else if (res.user) {
          setUser(res.user);
          router.push("/dashboard");
        }
      });
    },
    [setUser, router]
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleLogin(formData);
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Loading..." : "Log in"}
        </Button>
      </form>

      <div className="flex items-center gap-4 mt-6">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <form action={loginWithGoogle} className="mt-4">
        <Button
          variant="outline"
          type="submit"
          className="w-full flex items-center gap-2 justify-center"
          disabled
        >
          <Icons.google className="h-5 w-5" />
          Sign in with Google
        </Button>
      </form>
    </>
  );
}
