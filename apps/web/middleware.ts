import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { resolveLocale } from "@rancho-cocory/shared"

export function middleware(request: NextRequest) {
  const urlLang = request.nextUrl.searchParams.get("lang")
  const acceptLanguage = request.headers.get("accept-language")
  const locale = resolveLocale({ urlLang, acceptLanguage })

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", locale)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
