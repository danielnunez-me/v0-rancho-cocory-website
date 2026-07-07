import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { LOCALE_HEADER, resolveLocale } from "@rancho-cocory/shared"

export function middleware(request: NextRequest) {
  const locale = resolveLocale({
    searchParams: request.nextUrl.searchParams,
    acceptLanguage: request.headers.get("accept-language"),
  })

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(LOCALE_HEADER, locale)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
