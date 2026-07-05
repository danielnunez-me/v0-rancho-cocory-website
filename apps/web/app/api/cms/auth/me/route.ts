import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  isValidEditKey,
  SESSION_COOKIE,
  validateSession,
} from "@rancho-cocory/cms-server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const editKey =
    url.searchParams.get("edit_key") ??
    request.headers.get("x-edit-key") ??
    undefined

  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const hasValidKey = isValidEditKey(editKey)
  const isAuthed = await validateSession(token)

  return NextResponse.json({
    hasValidEditKey: hasValidKey,
    isAuthenticated: isAuthed,
    canEdit: hasValidKey && isAuthed,
  })
}
