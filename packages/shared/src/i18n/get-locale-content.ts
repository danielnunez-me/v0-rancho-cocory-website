import { pageContentSchema, type PageContent } from "../page-content"
import { DEFAULT_LOCALE, type Locale } from "./config"

export function isStaticLocale(locale: Locale): boolean {
  return locale !== DEFAULT_LOCALE
}

export async function getLocaleContent(locale: Locale): Promise<PageContent> {
  if (locale === "en") {
    const { enPageContent } = await import("../locales/en")
    return pageContentSchema.parse(enPageContent)
  }

  throw new Error(`Static locale content not available: ${locale}`)
}
