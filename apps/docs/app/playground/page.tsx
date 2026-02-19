import type { Metadata } from 'next'
import { AlertPlayground, AlertAllColors } from './alert-playground'

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

      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">Alert</h2>
          <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">
            @xaui/hybrid/alert
          </code>
        </div>
        <p className="text-sm text-muted-foreground">
          Displays contextual feedback messages. 4 variants · 6 theme colors · CSS fade animation
          on dismiss.
        </p>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Interactive</h3>
          <div className="rounded-xl border p-6">
            <AlertPlayground />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">All colors — flat</h3>
          <div className="rounded-xl border p-6 flex justify-center">
            <AlertAllColors variant="flat" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">All colors — solid</h3>
          <div className="rounded-xl border p-6 flex justify-center">
            <AlertAllColors variant="solid" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">All colors — bordered</h3>
          <div className="rounded-xl border p-6 flex justify-center">
            <AlertAllColors variant="bordered" />
          </div>
        </div>
      </section>
    </div>
  )
}
