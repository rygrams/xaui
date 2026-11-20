import type { Metadata } from 'next'
import { ComponentsCatalog } from '@/components/docs/components-catalog'
import { tramComponents } from '@/lib/data/components'
import { pageMetadata, TRAM_SITE_NAME } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Components — Metro-styled React Native',
  description: `All ${tramComponents.length} @xaui/tram components — the XAUI components redrawn in the Metro language, plus Tile, Pivot, Panorama, AppBar and JumpList — each with a live demo, its slots and a generated TypeScript API.`,
  path: '/docs/tram/components',
  siteName: TRAM_SITE_NAME,
})

export default function TramComponentsPage() {
  return <ComponentsCatalog packageName="tram" />
}
