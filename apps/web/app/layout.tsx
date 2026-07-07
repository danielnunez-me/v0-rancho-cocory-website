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
  DEFAULT_LOCALE,
  getLocaleMetadata,
  LOCALE_HEADER,
  type Locale,
} from "@rancho-cocory/shared"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const viewport: Viewport = {
  themeColor: "#29aae3",
  width: "device-width",
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers()
  const locale = (headerStore.get(LOCALE_HEADER) ?? DEFAULT_LOCALE) as Locale
  const data = getLocaleMetadata(locale)

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: data.openGraph,
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerStore = await headers()
  const locale = (headerStore.get(LOCALE_HEADER) ?? DEFAULT_LOCALE) as Locale

  let initialContent
  try {
    initialContent = await getPageContent(locale)
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
