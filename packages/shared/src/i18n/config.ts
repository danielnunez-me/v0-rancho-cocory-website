export const SUPPORTED_LOCALES = ["es", "en"] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: SupportedLocale = "es"

export const LOCALE_PARAM = "lang"

export const LOCALE_HEADER = "x-locale"

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}
