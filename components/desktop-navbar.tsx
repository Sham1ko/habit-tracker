"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, LogOut } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { cn } from "../lib/utils";
import { ROUTES } from "@/lib/constants/routes";
import { APP_NAV_ITEMS } from "@/lib/constants/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthStore } from "@/lib/stores/auth-store";
import { ColorModeSwitcher } from "./landing/color-mode-switcher";
import { logout } from "@/app/actions";

export function DesktopNavbar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const userInitials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : "U";

  return (
    <header className="hidden md:block fixed top-0 inset-x-0 z-50 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.APP.DASHBOARD}
            className="font-semibold text-lg mr-8"
          >
            Habit Tracker
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {APP_NAV_ITEMS.map(({ href, label, icon: Icon, disabled }) => (
                <NavigationMenuItem key={href}>
                  {disabled ? (
                    <div
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md cursor-not-allowed",
                        "text-gray-400 dark:text-zinc-600"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                  ) : (
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                        "text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800",
                        pathname === href &&
                          "text-black dark:text-white bg-gray-100 dark:bg-zinc-800"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <ColorModeSwitcher />

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={ROUTES.APP.SETTINGS}
                  className="w-full flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <form action={logout} className="w-full">
                <DropdownMenuItem
                  asChild
                  className="text-red-600 dark:text-red-400"
                >
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
