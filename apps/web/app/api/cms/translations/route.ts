import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  LOCALE_PARAM,
} from "@rancho-cocory/shared"
import {
  getLocaleTranslations,
  SESSION_COOKIE,
  updateLocaleTranslation,
  validateSession,
} from "@rancho-cocory/cms-server"

export const dynamic = "force-dynamic"

const translationPatchSchema = z.object({
  lang: z.string().optional(),
  path: z.string(),
  value: z.unknown(),
})

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const isAuthed = await validateSession(token)

  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const langParam = url.searchParams.get(LOCALE_PARAM)
    const locale =
      langParam && isSupportedLocale(langParam) ? langParam : DEFAULT_LOCALE

    if (locale === "es") {
      return NextResponse.json(
        { error: "Spanish content is edited via /api/cms/content" },
        { status: 400 },
      )
    }

    const translations = await getLocaleTranslations(locale)
    return NextResponse.json(translations)
  } catch (error) {
    console.error("Failed to load translations:", error)
    return NextResponse.json({ error: "Translations not found" }, { status: 404 })
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const isAuthed = await validateSession(token)

  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const parsed = translationPatchSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid patch", details: parsed.error.flatten() },
      { status: 400 },
    )
  }

  const locale =
    parsed.data.lang && isSupportedLocale(parsed.data.lang)
      ? parsed.data.lang
      : "en"

  if (locale === "es") {
    return NextResponse.json(
      { error: "Spanish content is edited via /api/cms/content" },
      { status: 400 },
    )
  }

  try {
    const translations = await updateLocaleTranslation(
      locale,
      parsed.data.path,
      parsed.data.value,
    )
    return NextResponse.json(translations)
  } catch (error) {
    console.error("Failed to update translation:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
