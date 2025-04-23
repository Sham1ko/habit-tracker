"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SignInSignUpButtons from "./sign-in-sign-up-buttons";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton"; // если у тебя есть такой UI-компонент
import { User } from "@supabase/supabase-js";

export default function LandingHeaderAuthButtons() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Skeleton className="h-9 w-44 rounded-md" />;
  }

  return user ? (
    <Link href="/dashboard" className={buttonVariants({ variant: "default" })}>
      Dashboard
    </Link>
  ) : (
    <SignInSignUpButtons />
  );
}
