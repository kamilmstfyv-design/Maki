import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PANEL_AUTH_COOKIE, getPanelAuthToken } from "@/lib/panel-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = getPanelAuthToken();

  if (!authToken) {
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(PANEL_AUTH_COOKIE)?.value;
  const isAuthenticated = cookieValue === authToken;
  const isLoginPage = pathname === "/panel/login";

  if (pathname.startsWith("/panel") && !isLoginPage && !isAuthenticated) {
    const loginUrl = new URL("/panel/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/panel", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*"],
};

