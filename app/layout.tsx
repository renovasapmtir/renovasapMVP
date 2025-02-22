import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import AppContent from './components/AppContent'
import { SITE_METADATA } from './utils/metadata'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = SITE_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <AppContent>{children}</AppContent>
        </Providers>
      </body>
    </html>
  )
}
