"use client";

import { useActionState, useTransition } from "react";
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
import { ROUTES } from "@/lib/constants/routes";

const initialState = { error: "" };

export default function RegisterPage() {
  const [signupState, signupAction] = useActionState(signup, initialState);
  const [isPending, startTransition] = useTransition();

  const handleSignup = (formData: FormData) => {
    startTransition(() => {
      signupAction(formData);
    });
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account with your email and password
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form action={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                minLength={6}
                required
                className="w-full"
              />
            </div>

            {signupState.error && (
              <p className="text-sm text-red-500">{signupState.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Sign up"}
            </Button>
          </form>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">or</span>
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

        <CardFooter className="justify-center text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-1 text-center">
          Already have an account?
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="font-semibold text-gray-800 hover:underline dark:text-gray-200"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
