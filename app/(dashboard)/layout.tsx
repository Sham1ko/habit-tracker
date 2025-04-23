"use client";

import { ThemeProvider } from "next-themes";
import { MobileNavbar } from "../../components/mobile-navbar";
import { DesktopNavbar } from "../../components/desktop-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        {/* Desktop-only navbar */}
        <DesktopNavbar />

        {/* Main content */}
        <main className="flex-1">{children}</main>

        {/* Mobile-only navbar */}
        <MobileNavbar />
      </div>
    </ThemeProvider>
  );
}
