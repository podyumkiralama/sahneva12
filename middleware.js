import { NextResponse } from "next/server";

const SUPPORTED_LOCALES = ["en", "ar", "tr"];

export const config = {
  matcher: ["/:path*"],
};

export default function middleware(request) {
  const requestHeaders = new Headers(request.headers);

  const pathname = request.nextUrl.pathname || "/";
  const firstSegment = pathname.split("/")[1]?.toLowerCase();
  const locale = SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : "tr";
  const direction = locale === "ar" ? "rtl" : "ltr";

  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-direction", direction);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
