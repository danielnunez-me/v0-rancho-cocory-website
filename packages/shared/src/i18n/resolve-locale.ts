import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  LOCALE_PARAM,
  normalizeLocaleTag,
  type Locale,
} from "./config"
import { parseAcceptLanguage } from "./parse-accept-language"

export interface ResolveLocaleInput {
  searchParams?: URLSearchParams | Record<string, string | string[] | undefined>
  acceptLanguage?: string | null
}

function getParamValue(
  searchParams: ResolveLocaleInput["searchParams"],
  key: string,
): string | undefined {
  if (!searchParams) return undefined

  if (searchParams instanceof URLSearchParams) {
    return searchParams.get(key) ?? undefined
  }

  const value = searchParams[key]
  if (Array.isArray(value)) return value[0]
  return value
}

export function resolveLocale(input: ResolveLocaleInput = {}): Locale {
  const param = getParamValue(input.searchParams, LOCALE_PARAM)

  if (param) {
    const normalized = normalizeLocaleTag(param)
    if (isSupportedLocale(normalized)) {
      return normalized
    }
    return DEFAULT_LOCALE
  }

  const preferred = parseAcceptLanguage(input.acceptLanguage)
  for (const tag of preferred) {
    if (isSupportedLocale(tag)) {
      return tag
    }
  }

  return DEFAULT_LOCALE
}
