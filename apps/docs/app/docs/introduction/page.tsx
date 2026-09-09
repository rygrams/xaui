import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Blocks, Gauge, Palette, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { components } from '@/lib/data/components'

export const metadata: Metadata = {
  title: 'Introduction — XAUI Native',
  description:
    'A React Native component library built on composition, Reanimated motion and semantic tokens.',
}

const principles = [
  {
    icon: Blocks,
    title: 'Explicit composition',
    text: 'Roots and dot-notation slots. JSX order is visual order — no hidden configuration props.',
  },
  {
    icon: Gauge,
    title: 'Motion on the UI thread',
    text: 'Interactions and transitions run on Reanimated, through one shared touch feedback.',
  },
  {
    icon: Palette,
    title: 'Semantic theme',
    text: 'A small source layer derives the light and dark palettes in OKLab.',
  },
]

export default function IntroductionPage() {
  return (
    <div className="space-y-14 pb-16">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium">
          <Sparkles className="size-3.5" /> @xaui/native · alpha
        </div>
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Composable React Native components.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground md:text-xl">
            {components.length} documented components, one visual vocabulary,
            Reanimated motion, and React Native styles with no implicit scale.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/docs/getting-started">
              Get started <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/docs/components">Browse components</Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {principles.map(({ icon: Icon, title, text }) => (
          <div className="rounded-2xl border bg-card p-6" key={title}>
            <Icon className="mb-5 size-5" />
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-2xl border p-6 md:p-8">
        <h2 className="text-2xl font-bold tracking-tight">The model in a minute</h2>
        <p className="max-w-2xl text-muted-foreground">
          Import a component from its subpath, put its slots in the order you want
          them, and set style props on the node they belong to.
        </p>
        <CodeBlock
          code={`import { Button } from '@xaui/native/button'

<Button variant="primary" width="100%" onPress={save}>
  <Button.Icon as={SaveIcon} />
  <Button.Label>Save</Button.Label>
</Button>`}
        />
      </section>
    </div>
  )
}
