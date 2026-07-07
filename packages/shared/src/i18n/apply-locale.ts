import type { PageContent } from "../page-content"
import { buildWhatsAppUrl } from "../whatsapp"

type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T

function hasId(value: unknown): value is { id: string } {
  return typeof value === "object" && value !== null && "id" in value
}

function findArrayItem(
  overlayArr: unknown[] | undefined,
  baseItem: unknown,
  index: number,
): unknown {
  if (!Array.isArray(overlayArr)) return undefined

  if (hasId(baseItem)) {
    return overlayArr.find(
      (item) => hasId(item) && item.id === baseItem.id,
    )
  }

  return overlayArr[index]
}

function applyLocaleOverlayValue<T>(
  base: T,
  overlay: DeepPartial<T> | undefined,
  fallback: T,
): T {
  if (typeof base === "string") {
    const overlayValue = overlay as string | undefined
    const fallbackValue = fallback as string
    return (overlayValue ?? fallbackValue ?? base) as T
  }

  if (
    typeof base !== "object" ||
    base === null ||
    typeof fallback !== "object" ||
    fallback === null
  ) {
    return base
  }

  if (Array.isArray(base)) {
    const fallbackArr = fallback as unknown[]
    return base.map((item, index) => {
      const overlayItem = findArrayItem(
        overlay as unknown[] | undefined,
        item,
        index,
      )
      const fallbackItem = findArrayItem(fallbackArr, item, index)
      return applyLocaleOverlayValue(
        item,
        overlayItem as DeepPartial<typeof item> | undefined,
        fallbackItem ?? item,
      )
    }) as T
  }

  const baseRecord = base as Record<string, unknown>
  const overlayRecord = (overlay ?? {}) as Record<string, unknown>
  const fallbackRecord = fallback as Record<string, unknown>
  const result: Record<string, unknown> = { ...baseRecord }

  for (const key of Object.keys(baseRecord)) {
    result[key] = applyLocaleOverlayValue(
      baseRecord[key],
      overlayRecord[key] as DeepPartial<unknown> | undefined,
      fallbackRecord[key],
    )
  }

  return result as T
}

function localizeWhatsAppLinks(content: PageContent): PageContent {
  const { phone, defaultMessage } = content.whatsapp

  return {
    ...content,
    navbar: {
      ...content.navbar,
      whatsappHref: buildWhatsAppUrl(phone, defaultMessage),
    },
    services: {
      ...content.services,
      items: content.services.items.map((item) => ({
        ...item,
        whatsappMessage: `${defaultMessage} — Activity: ${item.title}`,
      })),
    },
  }
}

/**
 * Applies locale translations onto Spanish canonical content.
 * Structure and non-text fields come from `base` (Firestore Spanish).
 * Text fields use `overlay` (Firestore translations), then `fallback` (static locale file).
 */
export function applyLocaleOverlay(
  base: PageContent,
  overlay: DeepPartial<PageContent> | null | undefined,
  fallback: PageContent,
): PageContent {
  const merged = applyLocaleOverlayValue(base, overlay ?? {}, fallback)
  return localizeWhatsAppLinks(merged)
}
