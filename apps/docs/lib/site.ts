import type { Metadata } from 'next'

/** Where the docs are served. Absolute URLs — the sitemap, robots, Open Graph — start here. */
export const SITE_URL = 'https://ui.xtartapp.com'

export const SITE_NAME = 'XAUI Native'

export const SITE_DESCRIPTION =
  'XAUI is a React Native UI component library for Expo and React Native: composable components with dot-notation slots, Reanimated motion, semantic theming and a TypeScript API.'

export const REPOSITORY_URL = 'https://github.com/rygrams/xaui'

/** Served by `app/og.png/route.tsx`. */
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — React Native UI component library`,
}

type PageMetadata = {
  title: string
  description: string
  path: string
  /** A markdown copy of the page, announced to agents with `rel="alternate"`. */
  markdownPath?: string
  keywords?: string[]
}

/**
 * The metadata every docs page needs, from the three things that differ per page.
 * Next merges `openGraph` and `twitter` shallowly, so a page that set only a title
 * would share the site's `og:title` and `og:url` — every field is written here instead.
 */
export function pageMetadata({
  title,
  description,
  path,
  markdownPath,
  keywords,
}: PageMetadata): Metadata {
  const fullTitle = `${title} — ${SITE_NAME}`

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
      types: markdownPath ? { 'text/markdown': markdownPath } : undefined,
    },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      locale: 'en_US',
      title: fullTitle,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
