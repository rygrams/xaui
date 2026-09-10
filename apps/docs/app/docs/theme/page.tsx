import type { Metadata } from 'next'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Theme — XAUI Native',
  description: 'Configure XAUI colours, scales and colour modes.',
}

export default function ThemePage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Theme</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          XAUI keeps the colours you choose apart from the colours components need.{' '}
          <code>createTheme</code> resolves both modes once; the provider only picks
          one.
        </p>
      </header>

      <DocSection title="Create a theme">
        <CodeBlock
          code={`import { createTheme } from '@xaui/native/theme'

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
  spacingUnit: 4,
  fontFamilies: { body: 'Inter', heading: 'Inter', mono: 'JetBrains Mono' },
})`}
        />
        <p className="text-muted-foreground">
          Declare the theme at module level. A fresh config on every render changes
          its identity and throws away the cached styles.
        </p>
      </DocSection>

      <DocSection title="Two colour layers">
        <div className="grid gap-4 md:grid-cols-2">
          <ThemeCard
            title="Source"
            text="background, foreground, surfaces, overlay, accent, semantic states, fields, borders and links — the product's own choices."
          />
          <ThemeCard
            title="Derived"
            text="pressed, soft, softForeground, secondary grounds, focus and separators. XAUI computes them from the source, in OKLab."
          />
        </div>
        <p className="text-sm text-muted-foreground">
          You can override a derived value, but start from the source: that is what
          keeps the palette coherent and the contrast right.
        </p>
      </DocSection>

      <DocSection title="Provider and colour mode">
        <CodeBlock
          code={`import { XAUIProvider } from '@xaui/native/theme'
import { appTheme } from './theme'

<XAUIProvider theme={appTheme} colorMode="system">
  <App />
</XAUIProvider>`}
        />
        <p className="text-muted-foreground">
          <code>system</code> follows the device. For an in-app switch, control{' '}
          <code>colorMode</code> with <code>light</code> or <code>dark</code> state —
          XAUI does not persist that choice for you.
        </p>
      </DocSection>

      <DocSection title="Read the tokens">
        <CodeBlock
          code={`import { useColorMode, useThemeColor, useXAUITheme } from '@xaui/native/theme'

function Example() {
  const theme = useXAUITheme()
  const mode = useColorMode()
  const accent = useThemeColor('accent')

  return (
    <View
      padding={theme.spacing(4)}
      borderRadius={theme.radius.lg}
      backgroundColor={accent}
      accessibilityLabel={\`${'${mode}'} mode\`}
    />
  )
}`}
        />
      </DocSection>

      <DocSection title="Scales">
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {[
            'spacing(steps) — configurable base, 4 by default',
            'radius — xs to 4xl, plus field and full',
            'fontSizes and lineHeights — xs to 4xl',
            'fontWeights — regular, medium, semibold, bold',
            'controlHeights — xs, sm, md and lg',
            'shadows — surface, overlay and field',
            'borderWidth — default and field',
            'opacity.disabled — the shared disabled state',
          ].map(item => (
            <li className="rounded-xl border px-4 py-3" key={item}>
              {item}
            </li>
          ))}
        </ul>
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

function ThemeCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  )
}
