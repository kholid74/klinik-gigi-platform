import type { Metadata } from 'next'
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://senyumsehat.id'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Klinik Gigi Senyum Sehat',
    default: 'Klinik Gigi Senyum Sehat — Bandung',
  },
  description:
    'Klinik gigi terpercaya di Bandung. Booking online mudah, dokter berpengalaman, layanan lengkap dari pemeriksaan rutin hingga ortodonti.',
  keywords: ['klinik gigi', 'dokter gigi bandung', 'scaling gigi', 'behel gigi', 'whitening gigi', 'cabut gigi bandung'],
  authors: [{ name: 'Klinik Gigi Senyum Sehat' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: 'Klinik Gigi Senyum Sehat',
    title: 'Klinik Gigi Senyum Sehat — Bandung',
    description: 'Klinik gigi terpercaya di Bandung. Booking online mudah, dokter berpengalaman.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Klinik Gigi Senyum Sehat Bandung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klinik Gigi Senyum Sehat — Bandung',
    description: 'Klinik gigi terpercaya di Bandung. Booking online mudah.',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${dmSerifDisplay.variable} ${plusJakartaSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
