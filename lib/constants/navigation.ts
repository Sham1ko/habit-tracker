import {
  Home,
  PlusCircle,
  Calendar,
  BarChart2,
  LucideIcon,
} from "lucide-react";
import { ROUTES } from "./routes";

export type AppNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  {
    href: ROUTES.APP.DASHBOARD,
    label: "Overview",
    icon: Home,
  },
  {
    href: ROUTES.APP.NEW_HABIT,
    label: "New Habit",
    icon: PlusCircle,
  },
  {
    href: "/calendar",
    label: "Calendar",
    icon: Calendar,
    disabled: true,
  },
  {
    href: ROUTES.APP.ANALYTICS,
    label: "Analytics",
    icon: BarChart2,
  },
];
