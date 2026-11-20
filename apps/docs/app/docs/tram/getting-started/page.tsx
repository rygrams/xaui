import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/ui/code-block'
import { tramComponents } from '@/lib/data/components'
import { pageMetadata, TRAM_KEYWORDS, TRAM_SITE_NAME } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
  title: 'Get started with Metro UI for React Native',
  description:
    'Install @xaui/tram, the Metro UI component library for React Native and Expo, mount the TramProvider and compose a first screen in the Metro design language — flat fills, square corners, giant light type and one accent colour.',
  path: '/docs/tram/getting-started',
  keywords: TRAM_KEYWORDS,
  siteName: TRAM_SITE_NAME,
})

export default function TramGettingStartedPage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-medium text-muted-foreground">@xaui/tram</p>
        <h1 className="text-4xl font-bold tracking-tight">Get started with Tram</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Tram is Metro UI for React Native: the XAUI components drawn in the Metro
          design language of Windows Phone, modernised — flat fills, square corners,
          giant light type and one accent colour. It runs on the{' '}
          <code>@xaui/native</code> engine, with the same names, slots and props —
          moving a screen from one to the other is mostly an import path.
        </p>
      </header>

      <Step number="1" title="Install the package">
        <CodeBlock language="bash" code="pnpm add @xaui/tram" />
        <p className="text-muted-foreground">
          <code>@xaui/tram</code> brings <code>@xaui/native</code> with it and needs
          the same native peers: React Native 0.70+ and Reanimated 4 on the New
          Architecture.
        </p>
        <CodeBlock
          language="bash"
          code={`npx expo install react-native-reanimated react-native-worklets \\
  react-native-gesture-handler react-native-svg react-native-safe-area-context`}
        />
        <p className="text-sm text-muted-foreground">
          <code>react-native-worklets/plugin</code> goes last in the Babel plugins —
          the{' '}
          <Link className="underline" href="/docs/installation">
            installation guide
          </Link>{' '}
          has the details, the same for both packages.
        </p>
      </Step>

      <Step number="2" title="Pick an accent, or keep cyan">
        <CodeBlock
          code={`// theme.ts
import { createTramTheme } from '@xaui/tram/theme'

export const appTheme = createTramTheme({ accent: 'cobalt' })`}
        />
        <p className="text-muted-foreground">
          The theme is black in dark mode and white in light, with one accent: one of
          the twenty Metro names (<code>cobalt</code>, <code>magenta</code>,{' '}
          <code>lime</code>…) or a <code>#RRGGBB</code>. The ink drawn on it is
          computed. Without <code>createTramTheme</code>, <code>TramProvider</code>{' '}
          uses the default cyan theme.
        </p>
        <p className="text-sm text-muted-foreground">
          The type is Selawik. Load it under that name with <code>expo-font</code> —{' '}
          <Link className="underline" href="/docs/fonts">
            Fonts
          </Link>{' '}
          shows how — or pass your own <code>fontFamilies</code>.
        </p>
      </Step>

      <Step number="3" title="Mount the provider and the scaffold">
        <CodeBlock
          code={`// app/_layout.tsx
import { Stack, useIsFocused } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Scaffold } from '@xaui/tram/scaffold'
import { TramProvider } from '@xaui/tram/theme'
import { appTheme } from './theme'

// Module level: the provider is handed the same objects on every render.
const PAGES = { useIsFocused }
const SAFE_AREA = { useSafeAreaInsets }

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TramProvider
        theme={appTheme}
        colorMode="system"
        pages={PAGES}
        safeArea={SAFE_AREA}
      >
        <Scaffold>
          <Scaffold.StatusBar />
          <Scaffold.Navigator>
            <Stack />
          </Scaffold.Navigator>
        </Scaffold>
      </TramProvider>
    </GestureHandlerRootView>
  )
}`}
        />
        <p className="text-muted-foreground">
          <code>TramProvider</code> is <code>XAUIProvider</code> with the Tram theme,
          so a Native component rendered under it is themed too. Tram ships no
          navigation, safe-area or haptics library: the app hands its own hooks over
          once — <code>pages</code> for the{' '}
          <Link className="underline" href="/docs/tram/components/page">
            page transitions
          </Link>
          , <code>safeArea</code> for the docked bars, and <code>onHaptic</code> for
          <code> expo-haptics</code>.
        </p>
      </Step>

      <Step number="4" title="Compose a screen">
        <CodeBlock
          code={`import { Button } from '@xaui/tram/button'
import { Typography } from '@xaui/tram/typography'

export function Inbox() {
  return (
    <>
      <Typography variant="page">inbox</Typography>
      <Button variant="contained" onPress={compose}>
        <Button.Icon as={PenIcon} />
        <Button.Label>new message</Button.Label>
      </Button>
    </>
  )
}`}
        />
        <p className="text-muted-foreground">
          Each component has its own subpath. Its <code>variant</code> says how the
          box is drawn — <code>contained</code>, <code>flat</code>,{' '}
          <code>outline</code>, <code>text</code> — and <code>accent</code> repaints
          one control in another Metro colour.
        </p>
      </Step>

      <Button asChild size="lg">
        <Link href="/docs/tram/components">
          Browse the {tramComponents.length} Tram components <ArrowRight />
        </Link>
      </Button>
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
