import type { Metadata } from 'next'
import { ComponentsCatalog } from '@/components/docs/components-catalog'
import { components } from '@/lib/data/components'
import { pageMetadata } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'React Native components',
  description: `All ${components.length} XAUI React Native components — buttons, forms, overlays, charts, navigation and layout — each with a live demo, its slots and a generated TypeScript API.`,
  path: '/docs/components',
})

export default function ComponentsPage() {
  return <ComponentsCatalog />
}
