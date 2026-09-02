import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Getting Started - Xaui',
  description: 'Get started with Xaui in your React Native project',
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Getting Started
        </h1>
        <p className="text-base text-muted-foreground md:text-xl">
          Learn how to set up Xaui in your React Native project and start building
          beautiful user interfaces.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">1. Installation</h2>
          <p className="text-muted-foreground">
            Install the core packages using your preferred package manager.
            <span className="font-mono text-xs"> @xaui/native </span>carries the
            theme and the provider, so it is a required peer of the frozen
            <span className="font-mono text-xs"> @xaui/native-legacy </span>tree —
            pin that one to an exact version.
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">With npm:</p>
              <CodeBlock
                code={`npm install @xaui/native @xaui/icons
npm install --save-exact @xaui/native-legacy@0.2.8`}
                language="bash"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Or with yarn:</p>
              <CodeBlock
                code={`yarn add @xaui/native @xaui/icons
yarn add --exact @xaui/native-legacy@0.2.8`}
                language="bash"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Or with pnpm:</p>
              <CodeBlock
                code={`pnpm add @xaui/native @xaui/icons
pnpm add --save-exact @xaui/native-legacy@0.2.8`}
                language="bash"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">
            2. Theme Customization
          </h2>
          <p className="text-muted-foreground">
            Xaui lets you override only the parts of the theme you need. Build the
            theme set once with
            <span className="font-mono text-xs"> createTheme() </span>and customize
            brand colors, typography tokens, spacing, radius, and more without
            rewriting the full theme.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>
              Override source colors per mode: non-overridden tokens keep their
              default values.
            </li>
            <li>
              The derived steps —
              <span className="font-mono text-xs"> accentSoft </span>,
              <span className="font-mono text-xs"> accentPressed </span>, and the
              rest — are recomputed from what you set.
            </li>
          </ul>
          <CodeBlock
            code={`// theme.ts
import { createTheme } from '@xaui/native/theme'

// Build it once, at module level: a literal object passed to the provider
// changes identity on every parent render and rebuilds every style in the app.
export const appTheme = createTheme({
  colors: {
    light: {
      accent: '#2563EB',
      accentForeground: '#FFFFFF',
      background: '#FFFFFF',
      foreground: '#0F172A',
    },
    dark: {
      accent: '#60A5FA',
      accentForeground: '#0F172A',
    },
  },
  radius: 16,
})`}
          />
          <p className="text-sm text-muted-foreground">
            Tip: Start by overriding only
            <span className="font-mono text-xs"> accent </span>and
            <span className="font-mono text-xs"> accentForeground </span>
            to quickly align Xaui with your brand, then extend to
            <span className="font-mono text-xs"> background </span>, spacing and
            typography if needed. Frozen components read the same values —
            <span className="font-mono text-xs"> accent </span>is what they call
            <span className="font-mono text-xs"> colors.primary.main </span>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">3. Setup Provider</h2>
          <p className="text-muted-foreground">
            Wrap your app with the XAUIProvider to enable theming and context. One
            provider themes both trees, so v1 and legacy screens can sit side by
            side:
          </p>
          <CodeBlock
            code={`import { XAUIProvider } from '@xaui/native/theme'
import { PortalHost } from '@xaui/native-legacy/core'
import { appTheme } from './theme'

export default function App() {
  return (
    <XAUIProvider theme={appTheme}>
      <PortalHost>
        <YourApp />
      </PortalHost>
    </XAUIProvider>
  )
}`}
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-mono text-xs">XUIProvider</span> from
            <span className="font-mono text-xs"> @xaui/native-legacy/core </span>
            still works as a deprecated wrapper around the same provider, but it is
            no longer prop-compatible with v0:
            <span className="font-mono text-xs"> theme </span>now takes the set
            returned by <span className="font-mono text-xs">createTheme</span>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">4. Use Components</h2>
          <p className="text-muted-foreground">
            Start using components in your application:
          </p>
          <CodeBlock
            code={`import { Button } from '@xaui/native-legacy/button'

export function MyComponent() {
  return (
    <Button themeColor="primary" onPress={() => console.log('Pressed!')}>
      Hello Xaui
    </Button>
  )
}`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold md:text-2xl">Next Steps</h2>
          <div className="flex flex-col gap-3">
            <Link href="/docs/installation">
              <Button variant="outline" className="justify-start">
                <ArrowRight className="mr-2 h-4 w-4" />
                Detailed Installation Guide
              </Button>
            </Link>
            <Link href="/docs/components">
              <Button variant="outline" className="justify-start">
                <ArrowRight className="mr-2 h-4 w-4" />
                Browse Components
              </Button>
            </Link>
            <Link href="/docs/theme">
              <Button variant="outline" className="justify-start">
                <ArrowRight className="mr-2 h-4 w-4" />
                Theme Guide
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
