import type { LocaleStrings } from "./locale-strings"

const staticLocaleLoaders: Record<
  string,
  () => Promise<{ defaultStrings: LocaleStrings }>
> = {
  en: () =>
    import("../locales/en.strings").then((m) => ({
      defaultStrings: m.enDefaultStrings,
    })),
}

/**
 * Loads static default text strings for a translation locale.
 * Spanish content always comes from Firestore.
 */
export async function getDefaultLocaleStrings(
  locale: string,
): Promise<LocaleStrings> {
  const loader = staticLocaleLoaders[locale]
  if (loader) {
    const { defaultStrings } = await loader()
    return defaultStrings
  }
  return {}
}
