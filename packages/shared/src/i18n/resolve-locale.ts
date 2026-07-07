import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  type SupportedLocale,
} from "./config"
import { parseAcceptLanguage, primaryLanguageTag } from "./parse-accept-language"

export interface ResolveLocaleInput {
  langParam?: string | null
  acceptLanguage?: string | null
}

/**
 * Resolves locale with priority:
 * 1. ?lang= query param
 * 2. Accept-Language header
 * 3. DEFAULT_LOCALE fallback
 */
export function resolveLocale(input: ResolveLocaleInput): SupportedLocale {
  const { langParam, acceptLanguage } = input

  if (langParam) {
    const normalized = langParam.toLowerCase().trim()
    if (isSupportedLocale(normalized)) {
      return normalized
    }
    return DEFAULT_LOCALE
  }

  const tags = parseAcceptLanguage(acceptLanguage ?? null)
  for (const tag of tags) {
    const primary = primaryLanguageTag(tag)
    if (isSupportedLocale(primary)) {
      return primary
    }
  }

  return DEFAULT_LOCALE
}
