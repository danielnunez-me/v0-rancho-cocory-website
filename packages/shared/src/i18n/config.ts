export const SUPPORTED_LOCALES = ["es", "en"] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = "es"

export const LOCALE_PARAM = "lang"

export const LOCALE_HEADER = "x-locale"

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function normalizeLocaleTag(tag: string): string {
  return tag.trim().toLowerCase().split("-")[0] ?? tag
}
