import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import { Nunito, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { PageLoader } from "@/components/page-loader"
import { ContentProvider } from "@/components/content-provider"
import { getPageContent } from "@/lib/cms-client"
import {
  buildPageMetadata,
  defaultPageContent,
  isDefaultLocale,
  isValidLocaleCode,
  LOCALE_HEADER,
} from "@rancho-cocory/shared"
import "./globals.css"

export const dynamic = "force-dynamic"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

async function getResolvedLocale(): Promise<string> {
  const headerStore = await headers()
  const localeHeader = headerStore.get(LOCALE_HEADER)
  if (!localeHeader) return "es"
  if (isDefaultLocale(localeHeader)) return "es"
  if (isValidLocaleCode(localeHeader)) return localeHeader
  return "es"
}

async function loadContentForLocale(locale: string) {
  return getPageContent(locale)
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getResolvedLocale()

  try {
    const content = await loadContentForLocale(locale)
    return buildPageMetadata(locale, content.seo, content.branding)
  } catch {
    return buildPageMetadata(
      locale,
      defaultPageContent.seo,
      defaultPageContent.branding,
    )
  }
}

export async function generateViewport(): Promise<Viewport> {
  const locale = await getResolvedLocale()

  try {
    const content = await loadContentForLocale(locale)
    return {
      themeColor: content.seo.themeColor,
      width: "device-width",
      initialScale: 1,
    }
  } catch {
    return {
      themeColor: defaultPageContent.seo.themeColor,
      width: "device-width",
      initialScale: 1,
    }
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getResolvedLocale()

  let initialContent
  try {
    initialContent = await loadContentForLocale(locale)
  } catch {
    initialContent = undefined
  }

  return (
    <html
      lang={locale}
      className={`${nunito.variable} ${playfair.variable} scroll-smooth scroll-pt-24 md:scroll-pt-28 bg-background`}
    >
      <body className="font-sans antialiased">
        <ContentProvider locale={locale} initialContent={initialContent}>
          <PageLoader />
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </ContentProvider>
        <Analytics />
      </body>
    </html>
  )
}
