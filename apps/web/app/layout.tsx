import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Nunito, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { PageLoader } from "@/components/page-loader"
import { ContentProvider } from "@/components/content-provider"
import { getPageContent } from "@/lib/cms-client"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
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
}

export const viewport: Viewport = {
  themeColor: "#29aae3",
  width: "device-width",
  initialScale: 1,
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
