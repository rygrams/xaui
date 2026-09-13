import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

      <Step number="5" title="Load a custom font (optional)">
        <p className="text-muted-foreground">
          XAUI never loads a font file — it only names one. Expo loads it, and{' '}
          <code>fontFamilies</code> in step 2 points at the loaded name. There are
          two ways to get it loaded, and they are exclusive: the config plugin needs
          a development build, and Expo Go only has the runtime one.
        </p>
        <Tabs defaultValue="embedded">
          <TabsList>
            <TabsTrigger value="embedded">Embedded (recommended)</TabsTrigger>
            <TabsTrigger value="runtime">Expo Go</TabsTrigger>
          </TabsList>
          <TabsContent value="embedded" className="space-y-4 pt-4">
            <p className="text-muted-foreground">
              Embedding the file at build time is the option to prefer: the font is
              in the binary, so it is there on the first frame with nothing to await.
            </p>
            <CodeBlock
              language="json"
              code={`// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": [
            "./assets/fonts/Inter-Regular.ttf",
            "./assets/fonts/Inter-Bold.ttf"
          ]
        }
      ]
    ]
  }
}`}
            />
            <p className="text-sm text-muted-foreground">
              Run <code>npx expo install expo-font</code> then{' '}
              <code>npx expo prebuild --clean</code>. This needs a development build
              — the config plugin does not apply in Expo Go.
            </p>
          </TabsContent>
          <TabsContent value="runtime" className="space-y-4 pt-4">
            <p className="text-muted-foreground">
              To stay in Expo Go, load at runtime instead and hold the splash screen
              until the font is ready:
            </p>
            <CodeBlock
              code={`import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { appTheme } from './theme'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [loaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
  })

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync()
  }, [loaded])

  if (!loaded) return null

  return (
    <XAUIProvider theme={appTheme}>
      <YourApp />
    </XAUIProvider>
  )
}`}
            />
            <p className="text-sm text-muted-foreground">
              The <code>if (!loaded) return null</code> is not cosmetic: without it
              the first frame renders in the system font and every text jumps when
              the real one arrives.
            </p>
          </TabsContent>
        </Tabs>
        <p className="text-muted-foreground">
          Either way, two traps are waiting once the file is loaded:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong>Weights are not synthesised.</strong> On Android one family is
            one file is one weight, so <code>fontWeight</code> will not reach{' '}
            <code>Inter-Bold</code> on its own. Ship a variable font — one file whose
            weight axis answers the numeric weights — or give each weight its own
            family name and map the roles:{' '}
            <code>{"{ body: 'Inter-Regular', heading: 'Inter-Bold' }"}</code>.
          </li>
          <li>
            <strong>The family name is not the file name.</strong> Android resolves
            the file name, iOS the font&apos;s PostScript name. When they differ,
            rename the file to match the PostScript name — Font Book shows it under
            the font&apos;s information — or branch on <code>Platform.select</code>.
          </li>
          <li>
            A name that resolves to nothing throws no error. It falls back to the
            system face, silently.
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
