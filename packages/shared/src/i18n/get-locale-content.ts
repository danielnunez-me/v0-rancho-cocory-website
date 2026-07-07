import type { PageContent } from "../page-content"
import type { SupportedLocale } from "./config"

/**
 * Loads static locale content for non-Spanish locales.
 * Spanish content is loaded from Firestore by the caller.
 */
export async function getLocaleContent(
  locale: SupportedLocale,
): Promise<PageContent> {
  switch (locale) {
    case "en": {
      const { enPageContent } = await import("../locales/en")
      return enPageContent
    }
    case "es":
      throw new Error(
        "Spanish content must be loaded from Firestore, not getLocaleContent",
      )
    default: {
      const _exhaustive: never = locale
      throw new Error(`Unsupported locale: ${_exhaustive}`)
    }
  }
}
