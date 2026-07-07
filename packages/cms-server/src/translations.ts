import {
  applyLocaleOverlay,
  getLocaleContent,
  type PageContent,
  type SupportedLocale,
} from "@rancho-cocory/shared"
import { FieldValue } from "firebase-admin/firestore"
import { getPageContent } from "./content"
import { getDb } from "./firebase"

const LOCALES_COLLECTION = "pageContentLocales"

export async function getLocaleTranslations(
  locale: SupportedLocale,
): Promise<Partial<PageContent>> {
  const snapshot = await getDb()
    .collection(LOCALES_COLLECTION)
    .doc(locale)
    .get()

  if (!snapshot.exists) {
    return {}
  }

  return (snapshot.data()?.data ?? {}) as Partial<PageContent>
}

export async function updateLocaleTranslation(
  locale: SupportedLocale,
  path: string,
  value: unknown,
): Promise<Partial<PageContent>> {
  const current = await getLocaleTranslations(locale)
  const updated = setByPath(current, path.split("."), value) as Partial<PageContent>

  await getDb().collection(LOCALES_COLLECTION).doc(locale).set(
    {
      data: updated,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  )

  return updated
}

export async function getLocalizedPageContent(
  locale: SupportedLocale,
): Promise<PageContent> {
  const spanish = await getPageContent()

  if (locale === "es") {
    return spanish
  }

  const overlay = await getLocaleTranslations(locale)
  const fallback = await getLocaleContent(locale)
  return applyLocaleOverlay(spanish, overlay, fallback)
}

function setByPath(obj: unknown, keys: string[], value: unknown): unknown {
  if (keys.length === 0) return value

  const [head, ...rest] = keys

  if (rest.length === 0) {
    if (Array.isArray(obj)) {
      const index = Number(head)
      if (Number.isNaN(index)) return obj
      const copy = [...obj]
      copy[index] = value
      return copy
    }
    const base =
      typeof obj === "object" && obj !== null
        ? (obj as Record<string, unknown>)
        : {}
    return { ...base, [head]: value }
  }

  if (Array.isArray(obj)) {
    const index = Number(head)
    if (Number.isNaN(index)) return obj
    const copy = [...obj]
    copy[index] = setByPath(copy[index], rest, value)
    return copy
  }

  const record =
    typeof obj === "object" && obj !== null
      ? { ...(obj as Record<string, unknown>) }
      : {}

  const nextKey = rest[0]
  const isNextIndex = !Number.isNaN(Number(nextKey))
  let child = record[head]
  if (child === undefined) {
    child = isNextIndex ? [] : {}
  }

  return {
    ...record,
    [head]: setByPath(child, rest, value),
  }
}
