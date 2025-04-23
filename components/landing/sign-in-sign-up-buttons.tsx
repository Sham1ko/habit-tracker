import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function SignInSignUpButtons() {
  return (
    <>
      <Link
        href="/auth/login"
        className={buttonVariants({ variant: "secondary" })}
      >
        Sign In
      </Link>
      <Link
        href="/auth/register"
        className={buttonVariants({ variant: "default" })}
      >
        Sign Up
      </Link>
    </>
  );
}
