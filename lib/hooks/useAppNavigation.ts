import { useRouter } from "next/navigation";
import { ROUTES } from "../constants/routes";

export function useAppNavigation() {
  const router = useRouter();

  return {
    goToLogin: () => router.push(ROUTES.AUTH.LOGIN),
    goToRegister: () => router.push(ROUTES.AUTH.REGISTER),
    goToDashboard: () => router.push(ROUTES.APP.DASHBOARD),
    goToSettings: () => router.push(ROUTES.APP.SETTINGS),
    goToNewHabit: () => router.push(ROUTES.APP.NEW_HABIT),

    // Typed navigation helper
    navigateTo: (route: string) => router.push(route),
  };
}
