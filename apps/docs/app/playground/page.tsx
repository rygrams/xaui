import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hybrid Playground — Xaui',
  description: 'Interactive playground for @xaui/hybrid web components with Tailwind v4.',
}

export default function PlaygroundPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Hybrid Playground</h1>
          <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900 dark:text-purple-300">
            @xaui/hybrid
          </span>
        </div>
        <p className="text-base text-muted-foreground md:text-xl">
          Live preview of hybrid web components — Tailwind v4, CSS animations, no animation
          library.
        </p>
      </div>
    </div>
  )
}
