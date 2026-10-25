import { NextResponse } from "next/server";
import { getSession } from "./app/data/session";
import { signInPath } from "./app/data/redirects";

export async function proxy(request) {
  const session = await getSession(request);
  if (session) {
    return NextResponse.next();
  }

  const destination = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  return NextResponse.redirect(new URL(signInPath(destination), request.url));
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/staff/:path*"],
};
