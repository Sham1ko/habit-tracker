"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNavbar() {
  const pathname = usePathname();

  const nav = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/habits/new", label: "New", icon: PlusCircle },
    { href: "/settings", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 z-50 w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-sm md:hidden">
      <div className="flex justify-around items-center h-14">
        {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center text-xs transition",
              "text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white",
              pathname === href && "text-black dark:text-white font-semibold"
            )}
          >
            <Icon className="h-5 w-5 mb-0.5" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
