import { Metadata } from 'next'
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
        <h1 className="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to set up Xaui in your React Native project and start building
          beautiful user interfaces.
        </p>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Installation</h2>
          <p className="text-muted-foreground">
            Install the core packages using your preferred package manager:
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">With npm:</p>
              <CodeBlock
                code="npm install @xaui/native @xaui/icons"
                language="bash"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Or with yarn:</p>
              <CodeBlock code="yarn add @xaui/native @xaui/icons" language="bash" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Or with pnpm:</p>
              <CodeBlock code="pnpm add @xaui/native @xaui/icons" language="bash" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Theme Customization</h2>
          <p className="text-muted-foreground">
            Xaui lets you override only the parts of the theme you need. You can
            customize brand colors, surface colors, text colors, typography tokens,
            spacing, radius, and more without rewriting the full theme.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-1">
            <li>
              Use <span className="font-mono text-xs">theme</span> for light mode.
            </li>
            <li>
              Use <span className="font-mono text-xs">darkTheme</span> for dark mode.
            </li>
            <li>Pass partial objects: non-overridden tokens keep default values.</li>
          </ul>
          <CodeBlock
            code={`import { XUIProvider } from '@xaui/native/core'

const customLightTheme = {
  colors: {
    primary: {
      main: '#2563EB',
      foreground: '#FFFFFF',
      background: '#DBEAFE',
    },
    secondary: {
      main: '#0EA5E9',
      foreground: '#FFFFFF',
      background: '#E0F2FE',
    },
    background: '#FFFFFF',
    foreground: '#0F172A',
  },
  borderRadius: {
    md: 12,
    lg: 16,
  },
}

const customDarkTheme = {
  colors: {
    primary: {
      main: '#60A5FA',
      foreground: '#0B1220',
      background: '#1E3A8A',
    },
    background: '#020617',
    foreground: '#E2E8F0',
  },
}

export default function App() {
  return (
    <XUIProvider theme={customLightTheme} darkTheme={customDarkTheme}>
      <YourApp />
    </XUIProvider>
  )
}`}
          />
          <p className="text-sm text-muted-foreground">
            Tip: Start by overriding only
            <span className="font-mono text-xs"> colors.primary </span>and
            <span className="font-mono text-xs"> colors.background </span>
            to quickly align Xaui with your brand, then extend to spacing and
            typography if needed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Setup Provider</h2>
          <p className="text-muted-foreground">
            Wrap your app with the XUIProvider to enable theming and context:
          </p>
          <CodeBlock
            code={`import { XUIProvider } from '@xaui/native/core'

export default function App() {
  return (
    <XUIProvider>
      <YourApp />
    </XUIProvider>
  )
}`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Use Components</h2>
          <p className="text-muted-foreground">
            Start using components in your application:
          </p>
          <CodeBlock
            code={`import { Button } from '@xaui/native/button'

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
          <h2 className="text-2xl font-semibold">Next Steps</h2>
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
