import { Pressable, ScrollView, Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useXAUITheme } from '@xaui/native/theme'
import { tramType } from '@xaui/tram/theme'

/**
 * The way into the Tram screens. A component adds its route to `tram/_layout` and one
 * line here.
 */
const SCREENS = [{ href: '/tram/theme', label: 'thème et mouvement' }] as const

export default function TramHomeScreen() {
  const theme = useXAUITheme()
  const router = useRouter()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 24, paddingBottom: 48 }}
    >
      <Text
        style={{
          color: theme.colors.foreground,
          fontFamily: theme.fontFamilies.heading,
          fontSize: tramType.page.fontSize,
          fontWeight: '300',
        }}
      >
        tram
      </Text>

      <View style={{ gap: 12 }}>
        {SCREENS.map(screen => (
          <Pressable
            key={screen.href}
            accessibilityRole="link"
            onPress={() => router.push(screen.href)}
            style={{ minHeight: 48, justifyContent: 'center' }}
          >
            <Text
              style={{
                color: theme.colors.foreground,
                fontFamily: theme.fontFamilies.body,
                fontSize: tramType.title.fontSize,
                fontWeight: '300',
              }}
            >
              {screen.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  )
}
