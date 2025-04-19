import { Urbanist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

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
      <body className={`${urbanist.variable} antialiased`}>{children}</body>
    </html>
  );
}
