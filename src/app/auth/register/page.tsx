"use client";

import { useActionState } from "react";
import { signup, loginWithGoogle } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import Link from "next/link";

const initialState = { error: "" };

export default function RegisterPage() {
  const [signupState, signupAction] = useActionState(signup, initialState);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-xl border-gray-100">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account with your email and password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={signupAction} className="space-y-4">
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

            {signupState.error && (
              <p className="text-sm text-red-500">{signupState.error}</p>
            )}

            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>

          <Separator className="my-6" />

          <form action={loginWithGoogle}>
            <Button
              variant="outline"
              type="submit"
              className="w-full flex items-center gap-2 justify-center"
            >
              <Icons.google className="h-5 w-5" />
              Sign up with Google
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="ml-1 font-semibold text-gray-800 hover:underline"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
