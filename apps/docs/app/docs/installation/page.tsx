import type { Metadata } from 'next'
import Link from 'next/link'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata: Metadata = {
  title: 'Installation — XAUI Native',
  description:
    'Install XAUI Native and its peer dependencies in an Expo or React Native app.',
}

export default function InstallationPage() {
  return (
    <div className="space-y-10 pb-16">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          XAUI targets React 18 or 19, React Native 0.70+ and Reanimated 4. Run the
          New Architecture, and on an Expo-managed project let Expo pick the native
          versions.
        </p>
      </header>

      <DocSection title="Expo (recommended)">
        <CodeBlock
          language="bash"
          code={`pnpm add @xaui/native@alpha libphonenumber-js
pnpm exec expo install react-native-reanimated react-native-worklets \\
  react-native-gesture-handler react-native-svg react-native-safe-area-context`}
        />
        <p className="text-muted-foreground">
          Rebuild the dev client after adding native modules with{' '}
          <code>pnpm exec expo prebuild</code>. Recent Expo SDKs already configure
          the Worklets plugin.
        </p>
      </DocSection>

      <DocSection title="React Native Community CLI">
        <CodeBlock
          language="bash"
          code={`pnpm add @xaui/native@alpha libphonenumber-js \\
  react-native-reanimated react-native-worklets react-native-gesture-handler \\
  react-native-svg react-native-safe-area-context
cd ios && pod install && cd ..`}
        />
        <p className="text-muted-foreground">
          Add <code>react-native-worklets/plugin</code> last in the Babel plugin
          list, then clear the Metro cache.
        </p>
        <CodeBlock
          code={`module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-worklets/plugin'], // always last
}`}
        />
      </DocSection>

      <DocSection title="Optional peers">
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3">Package</th>
                <th className="px-4 py-3">Used by</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  'react-native-gesture-handler',
                  'Slider, calendars, BottomSheet, TimePicker',
                ],
                ['react-native-svg', 'icons, progress and charts'],
                [
                  'react-native-safe-area-context',
                  'chrome and full-screen surfaces',
                ],
                ['libphonenumber-js', 'PhoneNumberField'],
              ].map(([dependency, usage]) => (
                <tr className="border-b last:border-0" key={dependency}>
                  <td className="px-4 py-3 font-mono text-xs">{dependency}</td>
                  <td className="px-4 py-3 text-muted-foreground">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Agent skill">
        <p className="text-muted-foreground">
          If you code with an agent, install the skill: it carries the import shape,
          the slot notation, what <code>variant</code> is against <code>color</code>,
          and a link to every component&apos;s markdown, so the agent reads the real
          API instead of guessing at one.
        </p>
        <CodeBlock
          language="bash"
          code={`npx skills add https://ui.xtartapp.com/skills/xaui/SKILL.md`}
        />
        <p className="text-muted-foreground">
          The skills CLI detects the agents on the machine and writes the skill into
          each one&apos;s skills directory — see{' '}
          <Link className="underline" href="/docs/skills">
            Agent skills
          </Link>{' '}
          for the manual install and the other agents.
        </p>
      </DocSection>

      <DocSection title="App root">
        <p className="text-muted-foreground">
          The gesture root wraps the XAUI provider. The provider mounts the portal
          host that dialogs, menus, selects and sheets render into.
        </p>
        <CodeBlock
          code={`import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { XAUIProvider } from '@xaui/native/theme'

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <XAUIProvider>
        <YourApp />
      </XAUIProvider>
    </GestureHandlerRootView>
  )
}`}
        />
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
