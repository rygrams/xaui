import type { Metadata } from 'next'
import { ComponentsCatalog } from '@/components/docs/components-catalog'
import { tramComponents } from '@/lib/data/components'
import { pageMetadata, TRAM_KEYWORDS, TRAM_SITE_NAME } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Metro UI components for React Native',
  description: `All ${tramComponents.length} Metro UI components of @xaui/tram for React Native and Expo — the Metro design language of Windows Phone, modernised, with live tiles, Pivot, Panorama, AppBar and JumpList — each with a live demo, its slots and a generated TypeScript API.`,
  path: '/docs/tram/components',
  keywords: TRAM_KEYWORDS,
  siteName: TRAM_SITE_NAME,
})

export default function TramComponentsPage() {
  return <ComponentsCatalog packageName="tram" />
}
