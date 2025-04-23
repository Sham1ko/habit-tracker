"use client";

import { useActionState } from "react";
import { signup, loginWithGoogle } from "../../actions";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Icons } from "../../../components/icons";
import Link from "next/link";

const initialState = { error: "" };

export default function RegisterPage() {
  const [signupState, signupAction] = useActionState(signup, initialState);

  return (
    <div className="flex w-screen items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border-gray-100 dark:border-gray-700">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account with your email and password
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
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
              disabled
            >
              <Icons.google className="h-5 w-5" />
              Sign up with Google
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="login"
            className="ml-1 font-semibold text-gray-800 hover:underline dark:text-gray-200"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
