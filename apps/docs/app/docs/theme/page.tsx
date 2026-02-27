import { Metadata } from 'next'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Theme - Xaui',
  description: 'Learn how to customize Xaui theme tokens and color modes',
}

const providerCode = `import { XUIProvider } from '@xaui/native/core'

const customLightTheme = {
  colors: {
    primary: {
      main: '#2563EB',
      onMain: '#FFFFFF',
      container: '#DBEAFE',
      onContainer: '#1E40AF',
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
      onMain: '#0B1220',
      container: '#1E3A8A',
      onContainer: '#60A5FA',
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
}`

const consumeThemeCode = `import { View, Text } from 'react-native'
import { useXUITheme, useColorMode } from '@xaui/native/core'

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
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Theme Customization</h1>
        <p className="text-base text-muted-foreground max-w-3xl md:text-xl">
          Customize Xaui to match your brand by overriding only the tokens you need.
          You can define separate light and dark themes while keeping all defaults for
          tokens you do not override.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">How It Works</h2>
        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
          <li>
            Pass a partial object to
            <span className="font-mono text-xs"> theme </span>
            for light mode.
          </li>
          <li>
            Pass a partial object to
            <span className="font-mono text-xs"> darkTheme </span>
            for dark mode.
          </li>
          <li>
            Xaui merges your overrides with defaults, so you only customize what you
            need.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">Provider Setup</h2>
        <p className="text-muted-foreground">
          Start by configuring your app-level provider with custom light and dark
          tokens.
        </p>
        <CodeBlock code={providerCode} />
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
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold md:text-2xl">Recommended Customization Order</h2>
        <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
          <li>Set core brand colors: primary (main, onMain, container, onContainer), background, and foreground.</li>
          <li>Tune border radius and spacing to match your product identity.</li>
          <li>Adjust typography tokens only when needed for readability.</li>
          <li>Validate both light and dark modes on real screens.</li>
        </ol>
      </section>
    </div>
  )
}
