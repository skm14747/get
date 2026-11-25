import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { INTENDED_LAUNCH_LOCALES } from "@/lib/locales";

const LOCALE_PREFIXES = new Set<string>(INTENDED_LAUNCH_LOCALES.filter((c) => c !== "en"));

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  const response = NextResponse.next();

  if (LOCALE_PREFIXES.has(firstSegment)) {
    response.headers.set("x-locale", firstSegment);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon|icon|apple-touch|opengraph|manifest|robots|sitemap|llms).*)"],
};
