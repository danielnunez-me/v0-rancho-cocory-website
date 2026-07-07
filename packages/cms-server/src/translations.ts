import {
  applyLocaleOverlay,
  getDefaultLocaleStrings,
  type PageContent,
} from "@rancho-cocory/shared"
import { getPageContent } from "./content"
import {
  getLocaleTranslations,
  isTranslationLocaleEnabled,
} from "./locale-config"

export async function getLocalizedPageContent(
  locale: string,
): Promise<PageContent> {
  const spanish = await getPageContent()

  if (locale === "es") {
    return spanish
  }

  const enabled = await isTranslationLocaleEnabled(locale)
  if (!enabled) {
    return spanish
  }

  const overlay = await getLocaleTranslations(locale)
  const fallback = await getDefaultLocaleStrings(locale)
  return applyLocaleOverlay(spanish, overlay, fallback)
}

export {
  getLocaleConfig,
  getEnabledTranslationLocales,
  isTranslationLocaleEnabled,
  addTranslationLocale,
  removeTranslationLocale,
  getLocaleTranslations,
  updateLocaleTranslation,
} from "./locale-config"
