export const SUPPORTED_LOCALES = ["es", "en"] as const
export const DEFAULT_LOCALE = "es"
export const LOCALE_PARAM = "lang"

export type Locale = (typeof SUPPORTED_LOCALES)[number]
