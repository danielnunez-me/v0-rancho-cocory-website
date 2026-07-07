export function getOpenGraphLocale(locale: string): string {
  if (locale === "es") return "es_DO"
  if (locale === "en") return "en_US"
  return `${locale}_${locale.toUpperCase()}`
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
  locale: string,
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
