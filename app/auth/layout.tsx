"use client";

import AuthHeader from "../../components/auth-header";
import { ThemeProvider } from "next-themes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <div className="bg-gray-100 dark:bg-zinc-900 text-black dark:text-white">
        <AuthHeader />
        <main className="flex min-h-screen items-center justify-center pt-14 px-4">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
