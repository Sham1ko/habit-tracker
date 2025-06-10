export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  APP: {
    DASHBOARD: "/dashboard",
    SETTINGS: "/settings",
    NEW_HABIT: "/habits/new",
    ANALYTICS: "/analytics",
  },
  LANDING: {
    HOME: "/",
    FEATURES: "/#features",
  },
  EXTERNAL: {
    GITHUB: "https://github.com/Sham1ko/habit-tracker",
    LINKEDIN: "https://www.linkedin.com/in/sham1ko/",
  },
} as const;

// Type-safe route getter
export function getRoute(path: string): string {
  return path;
}
