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
        <main className="flex items-center justify-center min-h-screen pt-14">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
