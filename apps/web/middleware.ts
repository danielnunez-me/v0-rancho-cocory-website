import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {
  LOCALE_HEADER,
  LOCALE_PARAM,
  resolveLocale,
} from "@rancho-cocory/shared"

export function middleware(request: NextRequest) {
  const langParam = request.nextUrl.searchParams.get(LOCALE_PARAM)
  const acceptLanguage = request.headers.get("accept-language")

  const locale = resolveLocale({ langParam, acceptLanguage })

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
