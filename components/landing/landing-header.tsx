"use client";
import { Logo } from "./logo";
import LandingHeaderAuthButtons from "./landing-header-auth-buttons";
import { ColorModeSwitcher } from "./color-mode-switcher";
import DesktopItems from "./desktop-items";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MobileItems from "./mobile-items";

interface NavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

export function LandingHeader(props: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full z-50 bg-background/80 px-4 md:px-8 backdrop-blur transition-shadow",
        scrolled && "shadow"
      )}
    >
      <div className="flex h-18 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-10">
          <Logo className="hidden md:flex" />

          {props.items?.length ? <DesktopItems items={props.items} /> : null}

          <MobileItems items={props.items} />
        </div>

        <div className="flex gap-4 items-center">
          <ColorModeSwitcher />
          <nav className="gap-4 items-center hidden md:flex">
            <LandingHeaderAuthButtons />
          </nav>
        </div>
      </div>
    </header>
  );
}
