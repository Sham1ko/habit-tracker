"use client";

import { useTheme } from "next-themes";
import { Logo } from "./landing/logo";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function AuthHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 h-14 flex items-center justify-between border-b bg-white dark:bg-zinc-900 text-black dark:text-white">
      <Logo link="/" />
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
