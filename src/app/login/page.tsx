"use client";

import { useActionState } from "react";
import { login, signup, loginWithGoogle } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import Link from "next/link";

const initialState = { error: "" };

export default function LoginPage() {
  const [loginState, loginAction] = useActionState(login, initialState);
  const [signupState] = useActionState(signup, initialState);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl border-gray-100">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Use your email and password to sign in
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-4">
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
                placeholder="••••••••"
                required
              />
            </div>

            {(loginState.error || signupState.error) && (
              <p className="text-sm text-red-500">
                {loginState.error || signupState.error}
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button type="submit" formAction={loginAction} className="w-full">
                Log in
              </Button>{" "}
            </div>
          </form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <form action={loginWithGoogle}>
            <Button
              variant="outline"
              type="submit"
              className="w-full flex items-center gap-2 justify-center"
            >
              <Icons.google className="h-5 w-5" />
              Sign in with Google
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-600">
          Don’t have an account?
          <Link
            href="/register"
            className="ml-1 font-semibold text-gray-800 hover:underline"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
