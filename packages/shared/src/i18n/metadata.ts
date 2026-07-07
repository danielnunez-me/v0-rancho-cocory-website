import type { SupportedLocale } from "./config"

interface LocaleMetadata {
  openGraphLocale: string
}

const localeMetadata: Record<SupportedLocale, LocaleMetadata> = {
  es: { openGraphLocale: "es_DO" },
  en: { openGraphLocale: "en_US" },
}

export function getOpenGraphLocale(locale: SupportedLocale): string {
  return localeMetadata[locale].openGraphLocale
}

export interface PageSeoMetadata {
  title: string
  description: string
  openGraph: {
    title: string
    description: string
    type: "website"
    locale: string
    siteName: string
    url: string
    images: Array<{ url: string }>
  }
  icons: {
    icon: string
    apple: string
  }
}

export function buildPageMetadata(
  locale: SupportedLocale,
  seo: {
    title: string
    description: string
    openGraphTitle: string
    openGraphDescription: string
    openGraphImage: string
    openGraphSiteName: string
    openGraphUrl: string
  },
  branding: { faviconUrl: string; appleTouchIconUrl?: string; logoUrl: string },
): PageSeoMetadata {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      type: "website",
      locale: getOpenGraphLocale(locale),
      siteName: seo.openGraphSiteName,
      url: seo.openGraphUrl,
      images: [{ url: seo.openGraphImage }],
    },
    icons: {
      icon: branding.faviconUrl,
      apple: branding.appleTouchIconUrl ?? branding.logoUrl,
    },
  }
}
