import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type Locale,
} from "./config"
import { parseAcceptLanguage } from "./parse-accept-language"

export function isSupportedLocale(
  value: string | null | undefined,
): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

export function resolveLocale(options: {
  urlLang?: string | null
  acceptLanguage?: string | null
}): Locale {
  if (options.urlLang) {
    return isSupportedLocale(options.urlLang) ? options.urlLang : DEFAULT_LOCALE
  }

  if (options.acceptLanguage) {
    for (const tag of parseAcceptLanguage(options.acceptLanguage)) {
      if (isSupportedLocale(tag)) {
        return tag
      }
    }
  }

  return DEFAULT_LOCALE
}
