import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Nunito, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { PageLoader } from "@/components/page-loader"
import { ContentProvider } from "@/components/content-provider"
import { getPageContent } from "@/lib/cms-client"
import { defaultPageContent } from "@rancho-cocory/shared"
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getPageContent()
    const { seo, branding } = content

    return {
      title: seo.title,
      description: seo.description,
      openGraph: {
        title: seo.openGraphTitle,
        description: seo.openGraphDescription,
        type: "website",
        locale: "es_DO",
        siteName: seo.openGraphSiteName,
        url: seo.openGraphUrl,
        images: [{ url: seo.openGraphImage }],
      },
      icons: {
        icon: branding.faviconUrl,
        apple: branding.appleTouchIconUrl ?? branding.logoUrl,
      },
    }
  } catch {
    return {
      title: defaultPageContent.seo.title,
      description: defaultPageContent.seo.description,
    }
  }
}

export async function generateViewport(): Promise<Viewport> {
  try {
    const content = await getPageContent()
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
  let initialContent
  try {
    initialContent = await getPageContent()
  } catch {
    initialContent = undefined
  }

  return (
    <html
      lang="es"
      className={`${nunito.variable} ${playfair.variable} scroll-smooth scroll-pt-24 md:scroll-pt-28 bg-background`}
    >
      <body className="font-sans antialiased">
        <ContentProvider initialContent={initialContent}>
          <PageLoader />
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </ContentProvider>
        <Analytics />
      </body>
    </html>
  )
}
