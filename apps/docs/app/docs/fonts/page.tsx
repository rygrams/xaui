import type { Metadata } from 'next'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Fonts — XAUI Native',
  description:
    'Load a custom font with Expo and point the XAUI theme at the loaded family.',
}

export default function FontsPage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Fonts</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          XAUI never loads a font file — it only names one. Expo loads it, the theme
          points at the loaded name, and a name that resolves to nothing falls back
          to the system face without saying so.
        </p>
      </header>

      <DocSection title="The theme names, Expo loads">
        <p className="text-muted-foreground">
          <code>fontFamilies</code> is three names — the body face, the headings, and
          the monospace one. Every component reads them from the theme, so this is
          the only place a family is written.
        </p>
        <CodeBlock
          code={`// theme.ts
import { createTheme } from '@xaui/native/theme'

export const appTheme = createTheme({
  fontFamilies: { body: 'Inter', heading: 'Inter', mono: 'JetBrains Mono' },
})`}
        />
        <p className="text-muted-foreground">
          Those strings are looked up by the platform, not by XAUI. Loading the file
          is Expo&apos;s job, and there are two ways to do it.
        </p>
      </DocSection>

      <DocSection title="Embed the file at build time">
        <p className="text-muted-foreground">
          The option to prefer: the font ships inside the binary, so it is there on
          the first frame with nothing to await and no splash screen to hold.
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
          Run <code>npx expo install expo-font</code>, then{' '}
          <code>npx expo prebuild --clean</code>. This needs a development build — a
          config plugin does not apply in Expo Go.
        </p>
      </DocSection>

      <DocSection title="Or load it at runtime">
        <p className="text-muted-foreground">
          The way to stay in Expo Go. The font arrives after the first render, so
          hold the splash screen until it is ready.
        </p>
        <CodeBlock
          code={`import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { XAUIProvider } from '@xaui/native/theme'
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
          The <code>if (!loaded) return null</code> is not cosmetic: without it the
          first frame renders in the system font and every text jumps when the real
          one arrives.
        </p>
      </DocSection>

      <DocSection title="Weights are not synthesised">
        <p className="text-muted-foreground">
          On Android one family is one file is one weight: <code>fontWeight</code>{' '}
          will not reach <code>Inter-Bold</code> on its own, and the bold a component
          asks for silently stays regular. Two ways out.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong>Ship a variable font.</strong> One file whose weight axis answers
            the numeric weights, and <code>fontWeight</code> works everywhere.
          </li>
          <li>
            <strong>Or give each weight its own family name</strong> and map the
            roles: <code>{"{ body: 'Inter-Regular', heading: 'Inter-Bold' }"}</code>.
            The headings are then bold because they are a different family, not
            because of a weight.
          </li>
        </ul>
      </DocSection>

      <DocSection title="The family name is not the file name">
        <p className="text-muted-foreground">
          Android resolves the file name; iOS resolves the font&apos;s PostScript
          name. When the two differ, the same string works on one platform and falls
          back on the other.
        </p>
        <p className="text-muted-foreground">
          Rename the file to match the PostScript name — Font Book shows it under the
          font&apos;s information — or branch on <code>Platform.select</code> in the
          theme.
        </p>
      </DocSection>

      <DocSection title="It fails silently">
        <p className="text-muted-foreground">
          A family name that resolves to nothing throws no error and logs nothing.
          The text renders in the system face, which is why a font that &quot;did not
          apply&quot; is almost always a name that never matched a loaded one. Check
          the name before the theme:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>The file is listed in the config plugin, or in the useFonts map.</li>
          <li>
            The development build was rebuilt after the plugin was added —{' '}
            <code>npx expo prebuild --clean</code>.
          </li>
          <li>
            The name in <code>fontFamilies</code> is the one that was loaded, spelled
            the same way, PostScript name included on iOS.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          The rest of the theme is on the{' '}
          <Link className="underline" href="/docs/theme">
            theme page
          </Link>
          .
        </p>
      </DocSection>
    </div>
  )
}

function DocSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}
