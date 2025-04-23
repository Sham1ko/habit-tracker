import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export default function DesktopItems({ items }: { items?: NavItem[] }) {
  return (
    <nav className="hidden gap-6 md:flex">
      {items?.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
