import { ScrollView, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Button } from '@xaui/native/button'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The way into the demo, and nothing else.
 *
 * One screen per v1 component or primitive, each one the place that component is verified
 * — in light and in dark, since there is no test file for any of them. This screen only
 * points at them, so that adding a component means adding a route and one line here rather
 * than growing a screen that already scrolls for a minute.
 */
const SCREENS = [
  { href: '/button', label: 'Button' },
  { href: '/card', label: 'Card' },
  { href: '/pressable-feedback', label: 'PressableFeedback' },
  { href: '/typography', label: 'Typography' },
  { href: '/icon', label: 'Icon' },
  { href: '/view', label: 'Layout' },
] as const

export default function HomeScreen() {
  const theme = useXAUITheme()
  const router = useRouter()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: 48 }}
    >
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        One screen per component. Each one is how that component is verified, in
        light and in dark.
      </Text>

      <View style={{ gap: 10 }}>
        {SCREENS.map(screen => (
          <Button
            key={screen.href}
            variant="tertiary"
            onPress={() => router.push(screen.href)}
          >
            {screen.label} →
          </Button>
        ))}
      </View>
    </ScrollView>
  )
}
