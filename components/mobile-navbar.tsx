"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { cn } from "../lib/utils";
import { APP_NAV_ITEMS } from "@/lib/constants/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ColorModeSwitcher } from "./landing/color-mode-switcher";
import { useAuthStore } from "@/lib/stores/auth-store";
import { logout } from "@/app/actions";

export function MobileNavbar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <>
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 z-50 w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-sm md:hidden">
        <div className="flex justify-around items-center h-16">
          {APP_NAV_ITEMS.slice(0, 4).map(
            ({ href, label, icon: Icon, disabled }) =>
              disabled ? (
                <div
                  key={href}
                  className={cn(
                    "flex flex-col items-center justify-center flex-1 h-full cursor-not-allowed",
                    "text-gray-300 dark:text-zinc-700"
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{label}</span>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                    "text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white",
                    pathname === href && "text-black dark:text-white"
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              )
          )}
        </div>
      </nav>

      {/* Mobile Menu Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 right-4 z-50 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-80">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                {user?.email}
              </span>
              <ColorModeSwitcher />
            </div>
            <div className="space-y-1">
              {APP_NAV_ITEMS.map(({ href, label, icon: Icon, disabled }) =>
                disabled ? (
                  <div
                    key={href}
                    className={cn(
                      "flex items-center gap-2 w-full p-2 text-sm font-medium rounded-md cursor-not-allowed",
                      "text-gray-400 dark:text-zinc-600"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </div>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 w-full p-2 text-sm font-medium rounded-md transition-colors",
                      "text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800",
                      pathname === href &&
                        "text-black dark:text-white bg-gray-100 dark:bg-zinc-800"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                )
              )}
            </div>
            <form action={logout} className="w-full mt-8">
              <button
                type="submit"
                className="w-full flex items-center gap-2 p-2 text-sm font-medium rounded-md transition-colors text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
