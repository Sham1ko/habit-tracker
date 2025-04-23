"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import LandingHeaderAuthButtons from "./landing-header-auth-buttons";
import { Logo } from "./logo";
import { Button } from "../ui/button";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export default function MobileItems({ items }: { items?: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="space-x-2 md:hidden"
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <Logo className="md:hidden" />

      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {items?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                    item.disabled && "cursor-not-allowed opacity-60"
                  )}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

              <div className="flex flex-col gap-2 mt-4">
                <LandingHeaderAuthButtons />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
