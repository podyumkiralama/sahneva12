import { NextResponse } from "next/server";

/**
 * Next.js `proxy` file convention (replaces middleware for request handling).
 * Keep this minimal/pass-through for maximum stability & performance.
 */
export const config = {
  matcher: [
    // Exclude API routes, Next.js internals, favicon, and any request with a file extension.
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};

export default function proxy() {
  return NextResponse.next();
}
