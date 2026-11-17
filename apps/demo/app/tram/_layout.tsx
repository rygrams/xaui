import { useState } from 'react'
import { Pressable, Text } from 'react-native'
import { Stack } from 'expo-router'
import { Scaffold } from '@xaui/native/scaffold'
import { useColorMode, useXAUITheme } from '@xaui/native/theme'
import { TramProvider } from '@xaui/tram/theme'

/**
 * The `@xaui/tram` half of the demo: one screen per Tram component, each the place that
 * component is verified, in dark and in light.
 *
 * Everything under here reads the Tram theme, the header included — the `Scaffold` is
 * Native's, resolving against a `TramProvider`, which is the first thing this layout
 * verifies: the two packages share one theme context.
 *
 * The mode starts as the one the rest of the demo is in and is flipped locally. The root
 * layout owns its own toggle and hides its header for this route, so there is one bar.
 */
export default function TramLayout() {
  const inherited = useColorMode()
  const [mode, setMode] = useState<'light' | 'dark' | null>(null)
  const colorMode = mode ?? inherited

  return (
    <TramProvider colorMode={colorMode} hasPortalHost={false}>
      <Scaffold>
        <Scaffold.StatusBar />
        <Scaffold.Navigator>
          <Stack
            screenOptions={{
              headerRight: () => (
                <ModeToggle
                  colorMode={colorMode}
                  onToggle={() => setMode(colorMode === 'light' ? 'dark' : 'light')}
                />
              ),
            }}
          >
            <Stack.Screen name="index" options={{ title: 'TRAM' }} />
            <Stack.Screen name="theme" options={{ title: 'THÈME' }} />
          </Stack>
        </Scaffold.Navigator>
      </Scaffold>
    </TramProvider>
  )
}

type ModeToggleProps = {
  colorMode: 'light' | 'dark'
  onToggle: () => void
}

/** Text alone, the Metro hyperlink — until the Tram `Button` exists to replace it. */
function ModeToggle({ colorMode, onToggle }: ModeToggleProps) {
  const theme = useXAUITheme()

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Changer le thème"
      hitSlop={12}
      onPress={onToggle}
    >
      <Text style={{ color: theme.colors.accent, fontSize: 16 }}>
        {colorMode === 'light' ? 'sombre' : 'clair'}
      </Text>
    </Pressable>
  )
}
