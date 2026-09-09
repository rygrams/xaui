import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'
import { SiteHeader } from '@/components/layout/site-header'
import { getReleases } from '@/lib/releases'
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'XAUI Native — Documentation',
    template: '%s',
  },
  description:
    'Documentation for the XAUI React Native components — live web demos and a generated TypeScript API.',
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  initialScale: 1,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const versions = getReleases().map(release => release.version)

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `globalThis.__DEV__ = ${process.env.NODE_ENV !== 'production'};`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SiteHeader version={versions[0]} versions={versions} />
        <div className="flex min-h-screen pt-26">
          <Sidebar versions={versions} />
          <main className="min-w-0 flex-1 md:pl-64">
            <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">{children}</div>
          </main>
        </div>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  )
}
