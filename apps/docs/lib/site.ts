import type { Metadata } from 'next'

/** Where the docs are served. Absolute URLs — the sitemap, robots, Open Graph — start here. */
export const SITE_URL = 'https://ui.xtartapp.com'

export const SITE_NAME = 'XAUI Native'

/** What a Tram page's title ends on, where a Native page's ends on `SITE_NAME`. */
export const TRAM_SITE_NAME = 'XAUI Tram'

export const SITE_DESCRIPTION =
  'XAUI is a React Native UI component library for Expo and React Native: composable components with dot-notation slots, Reanimated motion, semantic theming and a TypeScript API.'

export const REPOSITORY_URL = 'https://github.com/rygrams/xaui'

export const NPM_PACKAGE_URL = 'https://www.npmjs.com/package/@xaui/native'

export const TRAM_NPM_PACKAGE_URL = 'https://www.npmjs.com/package/@xaui/tram'

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
  /**
   * The name the title ends on. Tram's pages are `XAUI Tram`, so a tab or a search result
   * never reads as the Native docs; unset, the site's own name and the layout's template.
   */
  siteName?: string
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
  siteName,
}: PageMetadata): Metadata {
  const fullTitle = `${title} — ${siteName ?? SITE_NAME}`

  return {
    title: siteName ? { absolute: fullTitle } : title,
    description,
    keywords,
    alternates: {
      canonical: path,
      types: markdownPath ? { 'text/markdown': markdownPath } : undefined,
    },
    openGraph: {
      type: 'article',
      siteName: siteName ?? SITE_NAME,
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
