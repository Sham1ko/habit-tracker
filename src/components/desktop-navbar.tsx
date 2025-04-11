"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export function DesktopNavbar() {
  const pathname = usePathname();

  const nav = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/habits/new", label: "New", icon: PlusCircle },
    { href: "/settings", label: "Profile", icon: User },
  ];

  return (
    <nav className="hidden md:flex justify-center w-full py-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm z-50">
      <NavigationMenu>
        <NavigationMenuList className="gap-8">
          {nav.map(({ href, label, icon: Icon }) => (
            <NavigationMenuItem key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  "text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800",
                  pathname === href &&
                    "text-black dark:text-white bg-gray-100 dark:bg-zinc-800"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
