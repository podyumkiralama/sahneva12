import { NextResponse } from "next/server";

const ASSET_PREFIXES = ["/_next/", "/favicon", "/robots", "/sitemap", "/manifest", "/icon"];

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export function middleware(request) {
  const pathname = request.nextUrl.pathname || "/";

  // Skip assets and auto-generated files entirely
  if (ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  const firstSegment = pathname.split("/")[1]?.toLowerCase();
  const locale = ["en", "ar"].includes(firstSegment) ? firstSegment : "tr";
  const direction = locale === "ar" ? "rtl" : "ltr";

  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-direction", direction);

  return NextResponse.next({ request: { headers: requestHeaders } });
}
