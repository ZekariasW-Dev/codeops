import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "./app/data/sessionToken";

export function proxy(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token && verifySessionToken(token)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
