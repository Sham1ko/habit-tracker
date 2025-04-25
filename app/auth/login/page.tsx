import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Use your email and password to sign in
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <LoginForm />
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-1 text-center">
          Don’t have an account?
          <Link
            href="/register"
            className="font-semibold text-gray-800 hover:underline dark:text-gray-200"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
