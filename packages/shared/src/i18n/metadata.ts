import type { Locale } from "./config"

export interface LocaleMetadata {
  title: string
  description: string
  keywords: string[]
  openGraph: {
    title: string
    description: string
    type: "website"
    locale: string
  }
}

const metadataByLocale: Record<Locale, LocaleMetadata> = {
  es: {
    title: "Rancho Cocory | Parque Recreativo en Higuey, Republica Dominicana",
    description:
      "Rancho Cocory es el parque recreativo familiar en Higuey con piscinas, excursiones en buggy, paseos a caballo, paintball y mucho mas. Desde RD$350 por adulto.",
    keywords: [
      "Rancho Cocory",
      "parque recreativo",
      "Higuey",
      "Republica Dominicana",
      "piscinas",
      "buggy",
      "paintball",
      "pasadia",
      "excursiones",
    ],
    openGraph: {
      title: "Rancho Cocory | Parque Recreativo en Higuey",
      description:
        "Diversión familiar en Higuey. Piscinas, excursiones, paintball y mas.",
      type: "website",
      locale: "es_DO",
    },
  },
  en: {
    title: "Rancho Cocory | Family Recreation Park in Higuey, Dominican Republic",
    description:
      "Rancho Cocory is the family recreation park in Higuey with pools, buggy tours, horseback riding, paintball and more. From RD$350 per adult.",
    keywords: [
      "Rancho Cocory",
      "recreation park",
      "Higuey",
      "Dominican Republic",
      "pools",
      "buggy",
      "paintball",
      "day pass",
      "excursions",
    ],
    openGraph: {
      title: "Rancho Cocory | Family Recreation Park in Higuey",
      description:
        "Family fun in Higuey. Pools, excursions, paintball and more.",
      type: "website",
      locale: "en_US",
    },
  },
}

export function getLocaleMetadata(locale: Locale): LocaleMetadata {
  return metadataByLocale[locale] ?? metadataByLocale.es
}
