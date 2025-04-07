"use client";

import { ThemeProvider } from "next-themes";
import { LandingPageHeader } from "@/components/landing-page-header";
import { MobileNavbar } from "@/components/mobile-navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <LandingPageHeader
          items={[
            { title: "Features", href: "/#features" },
            {
              title: "Github",
              href: "https://github.com/Sham1ko/habit-tracker",
              external: true,
            },
          ]}
        />
        {/* <MobileNavbar /> */}
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  );
}
