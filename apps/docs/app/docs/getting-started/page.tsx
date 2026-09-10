import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Get started — XAUI Native',
  description: 'Set up the XAUI provider and compose your first screen.',
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Get started</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          One provider at the root, subpath imports, explicit slots. That is the
          whole setup.
        </p>
      </header>

      <Step number="1" title="Install the package">
        <CodeBlock language="bash" code="pnpm add @xaui/native@beta" />
        <p className="text-sm text-muted-foreground">
          The native peer dependencies are listed in the{' '}
          <Link className="underline" href="/docs/installation">
            installation guide
          </Link>
          .
        </p>
      </Step>

      <Step number="2" title="Create the theme once">
        <CodeBlock
          code={`// theme.ts
import { createTheme } from '@xaui/native/theme'

export const appTheme = createTheme({
  colors: {
    light: { accent: '#2563EB', accentForeground: '#FFFFFF' },
    dark: { accent: '#60A5FA', accentForeground: '#0F172A' },
  },
  radius: 16,
})`}
        />
        <p className="text-muted-foreground">
          Soft, pressed and contrasting colours are derived in OKLab. Do not rebuild
          the theme during render — its identity has to stay stable.
        </p>
      </Step>

      <Step number="3" title="Mount the provider">
        <CodeBlock
          code={`import { XAUIProvider } from '@xaui/native/theme'
import { appTheme } from './theme'

export default function App() {
  return (
    <XAUIProvider theme={appTheme}>
      <YourApp />
    </XAUIProvider>
  )
}`}
        />
        <p className="text-muted-foreground">
          <code>colorMode</code> takes <code>light</code>, <code>dark</code> or{' '}
          <code>system</code>. The portal host mounts with it.
        </p>
      </Step>

      <Step number="4" title="Compose a component">
        <CodeBlock
          code={`import { Button } from '@xaui/native/button'

export function SaveButton() {
  return (
    <Button variant="primary" onPress={save}>
      <Button.Icon as={SaveIcon} />
      <Button.Label>Save</Button.Label>
    </Button>
  )
}`}
        />
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Slots use dot notation and render in JSX order.</li>
          <li>
            <code>variant</code> picks a semantic appearance; <code>color</code>{' '}
            takes a raw hue.
          </li>
          <li>
            <Link className="underline" href="/docs/style-props">
              Style props
            </Link>{' '}
            keep the full React Native names and values —{' '}
            <code>padding={'{16}'}</code>, <code>width=&quot;100%&quot;</code>.
          </li>
          <li>
            <code>style</code> still wins, for transforms, shadows and computed
            values.
          </li>
        </ul>
      </Step>

      <div className="flex flex-wrap gap-3 border-t pt-8">
        <Button asChild>
          <Link href="/docs/components">
            Browse components <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/theme">Read the theme guide</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/faq">FAQ</Link>
        </Button>
      </div>
    </div>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4 md:grid-cols-[3rem_1fr]">
      <div className="flex size-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
        {number}
      </div>
      <div className="min-w-0 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {children}
      </div>
    </section>
  )
}
