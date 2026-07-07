import type { PageContent } from "../page-content"
import { DEFAULT_LOCALE, type Locale } from "./config"

export async function getLocaleContent(locale: Locale): Promise<PageContent> {
  if (locale === DEFAULT_LOCALE) {
    throw new Error("Spanish content is loaded from Firestore, not static locales")
  }

  switch (locale) {
    case "en": {
      const { enPageContent } = await import("../locales/en")
      return enPageContent
    }
    default:
      throw new Error(`Unsupported locale: ${locale}`)
  }
}
