import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";

export default function SignInSignUpButtons() {
  return (
    <>
      <Link
        href={ROUTES.AUTH.LOGIN}
        className={buttonVariants({ variant: "secondary" })}
      >
        Sign In
      </Link>
      <Link
        href={ROUTES.AUTH.REGISTER}
        className={buttonVariants({ variant: "default" })}
      >
        Sign Up
      </Link>
    </>
  );
}
