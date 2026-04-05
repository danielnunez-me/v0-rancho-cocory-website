import type { Metadata, Viewport } from 'next'
import { Nunito, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PageLoader } from '@/components/page-loader'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Rancho Cocory | Parque Recreativo en Higuey, Republica Dominicana',
  description:
    'Rancho Cocory es el parque recreativo familiar en Higuey con piscinas, excursiones en buggy, paseos a caballo, paintball y mucho mas. Desde RD$350 por adulto.',
  keywords: [
    'Rancho Cocory',
    'parque recreativo',
    'Higuey',
    'Republica Dominicana',
    'piscinas',
    'buggy',
    'paintball',
    'pasadia',
    'excursiones',
  ],
  openGraph: {
    title: 'Rancho Cocory | Parque Recreativo en Higuey',
    description:
      'Diversión familiar en Higuey. Piscinas, excursiones, paintball y mas.',
    type: 'website',
    locale: 'es_DO',
  },
}

export const viewport: Viewport = {
  themeColor: '#29aae3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <PageLoader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
