import type { Metadata } from 'next'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Theme - Xaui',
  description: 'Learn how to customize Xaui theme tokens and color modes',
}

const providerCode = `import { XAUIProvider, createTheme } from '@xaui/native/theme'
import { PortalHost } from '@xaui/native-legacy/core'

// Build the set once, at module level. A literal object passed to the provider
// changes identity on every parent render and rebuilds every style in the app.
const theme = createTheme({
  colors: {
    light: { accent: '#2563EB', accentForeground: '#FFFFFF' },
    dark: { accent: '#60A5FA', accentForeground: '#0F172A' },
  },
  radius: 16,
})

export default function App() {
  return (
    <XAUIProvider theme={theme}>
      <PortalHost>
        <YourApp />
      </PortalHost>
    </XAUIProvider>
  )
}`

const colorModeCode = `// 'system' follows the device; pass 'light' or 'dark' to control it yourself.
<XAUIProvider theme={theme} colorMode="dark">
  <YourApp />
</XAUIProvider>`

const consumeThemeCode = `import { View, Text } from 'react-native'
import { useXUITheme, useColorMode } from '@xaui/native-legacy/core'

export function ThemeExample() {
  const theme = useXUITheme()
  const mode = useColorMode()

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
      }}
    >
      <Text style={{ color: theme.colors.foreground }}>
        Current mode: {mode}
      </Text>
      <Text style={{ color: theme.colors.primary.main }}>
        Brand color from theme
      </Text>
    </View>
  )
}`

export default function ThemePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Theme Customization
        </h1>
        <p className="text-base text-muted-foreground max-w-3xl md:text-xl">
          Customize Xaui to match your brand by overriding only the tokens you need.
          Provide partial overrides and keep defaults for everything you do not
          specify.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">How It Works</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            Build the theme with
            <span className="font-mono text-xs"> createTheme() </span>and pass the
            result to
            <span className="font-mono text-xs"> theme </span>. It returns both color
            modes resolved, so the provider only selects one.
          </li>
          <li>
            Override only the source colors you need, per mode. Everything else —
            including the derived
            <span className="font-mono text-xs"> Soft </span>and
            <span className="font-mono text-xs"> Pressed </span>steps — is recomputed
            for you.
          </li>
          <li>
            One provider themes both trees:
            <span className="font-mono text-xs"> colors.light.accent </span>is what
            the frozen components read as
            <span className="font-mono text-xs"> colors.primary.main </span>.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">Provider Setup</h2>
        <p className="text-muted-foreground">
          Configure your app-level provider with the theme set you built.
        </p>
        <CodeBlock code={providerCode} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">Color Mode</h2>
        <p className="text-muted-foreground">
          The provider follows the device scheme by default. Pass
          <span className="font-mono text-xs"> colorMode </span>to control it — the
          library owns neither the state nor its persistence.
        </p>
        <CodeBlock code={colorModeCode} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">Using Theme Values</h2>
        <p className="text-muted-foreground">
          Access resolved values in any component with
          <span className="font-mono text-xs"> useXUITheme() </span>and check current
          mode with
          <span className="font-mono text-xs"> useColorMode() </span>.
        </p>
        <CodeBlock code={consumeThemeCode} />
        <p className="text-sm text-muted-foreground">
          These hooks return the MD3 shape the frozen components read, projected from
          the same provider. On the v1 tree, read the tokens directly with
          <span className="font-mono text-xs"> useXAUITheme() </span>from
          <span className="font-mono text-xs"> @xaui/native/theme </span>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">
          Recommended Customization Order
        </h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
          <li>
            Set your brand color: <span className="font-mono text-xs">accent</span>{' '}
            and <span className="font-mono text-xs">accentForeground</span>, in both
            <span className="font-mono text-xs"> light </span>and
            <span className="font-mono text-xs"> dark </span>.
          </li>
          <li>
            Then <span className="font-mono text-xs">background</span>,
            <span className="font-mono text-xs"> foreground </span>and the
            <span className="font-mono text-xs"> surface </span>levels.
          </li>
          <li>
            Tune <span className="font-mono text-xs">radius</span> — one base the
            whole scale derives from — and
            <span className="font-mono text-xs"> spacingUnit </span>to match your
            product identity.
          </li>
          <li>
            Adjust <span className="font-mono text-xs">fontFamilies</span> and
            <span className="font-mono text-xs"> fontSizes </span>only when needed
            for readability.
          </li>
          <li>Validate both light and dark modes on real screens.</li>
        </ol>
      </section>
    </div>
  )
}
