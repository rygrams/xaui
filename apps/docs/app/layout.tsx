import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'
import { SiteHeader } from '@/components/layout/site-header'
import { JsonLd } from '@/components/seo/json-ld'
import { getReleases } from '@/lib/releases'
import {
  OG_IMAGE,
  REPOSITORY_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site'
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — React Native UI component library`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'react native',
    'react native ui library',
    'react native components',
    'expo',
    'expo ui components',
    'reanimated',
    'design system',
    'typescript',
    'xaui',
  ],
  alternates: {
    canonical: '/',
    types: { 'text/plain': '/llms.txt' },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: '/',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

/**
 * What the site is, for search engines and for the agents that read structured data
 * before prose: the site itself, and the library it documents.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE_URL}/#library`,
      name: '@xaui/native',
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      codeRepository: REPOSITORY_URL,
      programmingLanguage: ['TypeScript', 'React Native'],
      runtimePlatform: ['iOS', 'Android', 'Web'],
      license: `${REPOSITORY_URL}/blob/main/LICENSE`,
    },
  ],
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
        <JsonLd data={structuredData} />
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
