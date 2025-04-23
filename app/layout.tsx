import { Urbanist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <SpeedInsights />
      <body className={`${urbanist.variable} antialiased`}>{children}</body>
    </html>
  );
}
