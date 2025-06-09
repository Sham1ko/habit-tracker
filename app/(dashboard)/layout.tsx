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

        {/* Main content with proper spacing for fixed navbar */}
        <div className="flex-1 flex justify-center pt-16 md:pt-20 pb-16 md:pb-4 bg-gradient-to-br from-background via-background to-muted/20">
          {children}
        </div>

        {/* Mobile-only navbar */}
        <MobileNavbar />
      </div>
    </ThemeProvider>
  );
}
