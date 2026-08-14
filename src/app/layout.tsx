import './globals.css'
import { Roboto } from 'next/font/google'
import { Protest_Riot, Pacifico } from 'next/font/google'
import { SmoothScrollWrapper } from '@/components/SmoothScrollWrapper'
import JsonLd from '@/components/JsonLd'
import FloatingParticles from '@/components/FloatingParticles'
import type { Metadata, Viewport } from 'next'

// Load font Roboto
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
})

// Load Protest Riot
const protest = Protest_Riot({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-protest',
  display: 'swap',
})

// Load Pacifico
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
  display: 'swap',
})

// Metadata export (tanpa viewport)
export const metadata: Metadata = {
  metadataBase: new URL('https://stevchrist.site'),
  title: {
    default: 'Steven Immanuel C. Girsang (Steven Girsang) | Personal Website',
    template: '%s | Steven Immanuel C. Girsang',
  },
  description: 'Official personal website and portfolio of Steven Immanuel C. Girsang (Steven Girsang / StevChrist) — Data Scientist & Data Engineer, fresh graduate from Telkom University Bandung. Specializing in Machine Learning, Data Analytics, and Web Development.',
  icons: {
    icon: '/image/Logo PEN White 1x1.png',
    shortcut: '/image/Logo PEN White 1x1.png',
    apple: '/image/Logo PEN White 1x1.png',
  },
  keywords: [
    'Steven Girsang',
    'Steven Immanuel',
    'Steven Immanuel C Girsang',
    'Steven Immanuel Christiano Girsang',
    'Steven I C G',
    'Steven Christiano',
    'StevenChrist',
    'StevChrist',
    'StevChris',
    'Data Scientist',
    'Portfolio',
    'Web Developer',
    'Machine Learning',
    'Data Analysis',
    'Telkom University',
    'Bandung',
    'stevchrist.site',
  ],
  authors: [{ name: 'Steven Immanuel C. Girsang', url: 'https://stevchrist.site' }],
  creator: 'Steven Immanuel C. Girsang',
  publisher: 'Steven Immanuel C. Girsang',
  alternates: {
    canonical: 'https://stevchrist.site',
  },
  openGraph: {
    title: 'Steven Immanuel C. Girsang | Personal Website',
    description: 'Personal portfolio of Steven Immanuel C. Girsang — Data Scientist from Telkom University Bandung.',
    url: 'https://stevchrist.site',
    siteName: 'Steven Immanuel C. Girsang',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/image/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Steven Immanuel C. Girsang — Data Scientist Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steven Immanuel C. Girsang | Personal Website',
    description: 'Personal portfolio of Steven Immanuel C. Girsang — Data Scientist from Telkom University Bandung.',
    creator: '@_Stevchris',
    images: ['/image/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Viewport export terpisah
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${protest.variable} ${pacifico.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${roboto.className} antialiased`}>
        <JsonLd />
        <FloatingParticles />
        <SmoothScrollWrapper>
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  )
}
