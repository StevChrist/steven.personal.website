import './globals.css'
import { Roboto } from 'next/font/google'
import { Protest_Riot, Pacifico } from 'next/font/google'
import { SmoothScrollWrapper } from '@/components/SmoothScrollWrapper'
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
  title: 'Steven | Personal Website',
  description: 'Personal portfolio of Steven Immanuel C. Girsang - Data Scientist',
  icons: {
    icon: '/image/Logo PEN White 1x1.png',
  },
  keywords: 'Steven Immanuel, Data Science, Portfolio, Web Developer, Machine Learning, Telkom University',
  authors: [{ name: 'Steven Immanuel C. Girsang' }],
  creator: 'Steven Immanuel C. Girsang',
  openGraph: {
    title: 'Steven | Personal Website',
    description: 'Personal portfolio of Steven Immanuel C. Girsang - Data Scientist',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steven | Personal Website',
    description: 'Personal portfolio of Steven Immanuel C. Girsang - Data Scientist',
    creator: '@_Stevchris',
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
        <SmoothScrollWrapper>
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  )
}
