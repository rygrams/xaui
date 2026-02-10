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
          <h2 className="text-2xl font-semibold">2. Setup Provider</h2>
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
          <h2 className="text-2xl font-semibold">3. Use Components</h2>
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
          </div>
        </section>
      </div>
    </div>
  )
}
