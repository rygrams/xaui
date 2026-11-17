import { Pressable, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useXAUITheme } from '@xaui/native/theme'
import { Typography } from '@xaui/tram/typography'

/**
 * The way into the Tram screens. A component adds its route to `tram/_layout` and one
 * line here.
 */
const SCREENS = [
  { href: '/tram/theme', label: 'thème et mouvement' },
  { href: '/tram/button', label: 'button' },
  { href: '/tram/switch', label: 'switch' },
  { href: '/tram/checkbox', label: 'checkbox' },
  { href: '/tram/radio', label: 'radio' },
  { href: '/tram/typography', label: 'typography' },
] as const

export default function TramHomeScreen() {
  const theme = useXAUITheme()
  const router = useRouter()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 24, paddingBottom: 48 }}
    >
      <Typography variant="page" accessibilityRole="header">
        tram
      </Typography>

      <View style={{ gap: 12 }}>
        {SCREENS.map(screen => (
          <Pressable
            key={screen.href}
            accessibilityRole="link"
            onPress={() => router.push(screen.href)}
            style={{ minHeight: 48, justifyContent: 'center' }}
          >
            <Typography variant="title">{screen.label}</Typography>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}
