"use client";

import { useActionState } from "react";
import { login, signup, loginWithGoogle } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";

const initialState = { error: "" };

export default function LoginPage() {
  const [loginState, loginAction] = useActionState(login, initialState);
  const [signupState, signupAction] = useActionState(signup, initialState);

  return (
    <div className="flex flex-col justify-center min-h-screen px-4">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-gray-500">Log in or create an account</p>
        </div>

        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {(loginState.error || signupState.error) && (
            <div className="text-red-500 text-sm mt-2">
              {loginState.error || signupState.error}
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button type="submit" formAction={loginAction} className="w-full">
              Log in
            </Button>
            <Button
              type="submit"
              formAction={signupAction}
              variant="outline"
              className="w-full"
            >
              Sign up
            </Button>
          </div>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <form action={loginWithGoogle}>
          <Button
            variant="outline"
            type="submit"
            className="w-full flex items-center gap-2"
          >
            <Icons.google className="h-5 w-5" />
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
