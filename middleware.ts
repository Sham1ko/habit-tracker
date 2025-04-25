import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";
import { createServerSupabaseClient } from "./lib/supabase/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const protectedPaths = ["/dashboard", "/settings", "/habits"];
  const authPages = ["/auth/login", "/auth/register"];
  const pathname = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPage = authPages.some((path) => pathname.startsWith(path));

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtectedPath && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // if (isAuthPage && user) {
  //   const dashboardUrl = new URL("/dashboard", request.url);
  //   return NextResponse.redirect(dashboardUrl);
  // }

  return response;
}
