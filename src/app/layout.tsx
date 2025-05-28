import './globals.css'
import { Roboto } from 'next/font/google'
import { Protest_Riot } from 'next/font/google'
import { SmoothScrollWrapper } from '@/components/SmoothScrollWrapper'

// Load font Roboto (bisa pilih weight tertentu)
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

// Load Protest Riot yang kamu sudah pakai
const protest = Protest_Riot({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-protest',
  display: 'swap',
})

export const metadata = {
  title: 'Steven | Personal Website',
  description: 'Personal portfolio of Steven Immanuel',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${protest.variable}`}>
      <body className="bg-black text-white">
        <SmoothScrollWrapper>
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  )
}
