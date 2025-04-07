"use client";

import AuthHeader from "@/components/auth-header";
import { ThemeProvider } from "next-themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 text-black dark:text-white">
        <AuthHeader />
        {children}
      </div>
    </ThemeProvider>
  );
}
