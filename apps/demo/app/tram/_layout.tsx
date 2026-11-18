import { useState } from 'react'
import { Stack, useIsFocused } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Scaffold } from '@xaui/native/scaffold'
import { useColorMode } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { pageScreenOptions } from '@xaui/tram/page'
import { TramProvider } from '@xaui/tram/theme'
import type { TramHaptic } from '@xaui/tram/theme'
import { ToastHost } from '@xaui/tram/toast'

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
  // The toast pile is put under the notch by the app; the `Fab`'s bar reads the bottom
  // inset itself, through the hook handed to the provider.
  const insets = useSafeAreaInsets()

  return (
    <TramProvider
      colorMode={colorMode}
      hasPortalHost={false}
      onHaptic={feel}
      pages={PAGES}
      safeArea={SAFE_AREA}
    >
      <ToastHost offset={Math.max(insets.top, 10)} dismissLabel="fermer">
        <Scaffold>
          <Scaffold.StatusBar />
          <Scaffold.Navigator>
            <Stack
              screenOptions={{
                headerRight: () => (
                  <ModeToggle
                    colorMode={colorMode}
                    onToggle={() =>
                      setMode(colorMode === 'light' ? 'dark' : 'light')
                    }
                  />
                ),
              }}
            >
              <Stack.Screen name="index" options={{ title: 'TRAM' }} />
              <Stack.Screen name="theme" options={{ title: 'THÈME' }} />
              <Stack.Screen
                name="page"
                options={{ title: 'PAGE', ...pageScreenOptions }}
              />
              <Stack.Screen
                name="page-detail"
                options={{ title: 'PAGE', ...pageScreenOptions }}
              />
              <Stack.Screen name="app-bar" options={{ title: 'APP BAR' }} />
              <Stack.Screen name="button" options={{ title: 'BUTTON' }} />
              <Stack.Screen name="switch" options={{ title: 'SWITCH' }} />
              <Stack.Screen name="checkbox" options={{ title: 'CHECKBOX' }} />
              <Stack.Screen name="radio" options={{ title: 'RADIO' }} />
              <Stack.Screen name="slider" options={{ title: 'SLIDER' }} />
              <Stack.Screen
                name="progress-bar"
                options={{ title: 'PROGRESS BAR' }}
              />
              <Stack.Screen name="text-field" options={{ title: 'TEXT FIELD' }} />
              <Stack.Screen name="text-area" options={{ title: 'TEXT AREA' }} />
              <Stack.Screen name="select" options={{ title: 'SELECT' }} />
              <Stack.Screen name="list-box" options={{ title: 'LIST BOX' }} />
              <Stack.Screen
                name="wheel-picker"
                options={{ title: 'WHEEL PICKER' }}
              />
              <Stack.Screen name="dialog" options={{ title: 'DIALOG' }} />
              <Stack.Screen name="fab" options={{ title: 'FAB' }} />
              <Stack.Screen name="toast" options={{ title: 'TOAST' }} />
              <Stack.Screen name="tabs" options={{ title: 'TABS' }} />
              <Stack.Screen name="tile" options={{ title: 'TILE' }} />
              <Stack.Screen
                name="toggle-button"
                options={{ title: 'TOGGLE BUTTON' }}
              />
              <Stack.Screen name="typography" options={{ title: 'TYPOGRAPHY' }} />
            </Stack>
          </Scaffold.Navigator>
        </Scaffold>
      </ToastHost>
    </TramProvider>
  )
}

/**
 * The app's side of Tram's page transitions: Expo Router's own focus hook, which is how a
 * `Page` learns it was covered or uncovered. At module level, so the provider is handed
 * the same object on every render.
 */
const PAGES = { useIsFocused }

/**
 * The app's safe-area hook, for the `Fab`'s and the `AppBar`'s bands: at module level, so
 * it is always the same.
 */
const SAFE_AREA = { useSafeAreaInsets }

/**
 * The app's side of Tram's haptics: the lightest impact iOS has for a press, its
 * selection tick for a switch that flips. At module level, so the provider is handed the
 * same function on every render.
 *
 * Loaded on demand and allowed to fail: a binary built before `expo-haptics` was added
 * has no native module to load, and the web and the simulator have nothing to vibrate.
 */
function feel(moment: TramHaptic) {
  import('expo-haptics')
    .then(Haptics =>
      moment === 'selection'
        ? Haptics.selectionAsync()
        : Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    )
    .catch(() => {})
}

type ModeToggleProps = {
  colorMode: 'light' | 'dark'
  onToggle: () => void
}

/** Text alone, the Metro hyperlink: the Tram `Button`, in its `text` variant. */
function ModeToggle({ colorMode, onToggle }: ModeToggleProps) {
  return (
    <Button
      variant="text"
      size="sm"
      accessibilityLabel="Changer le thème"
      onPress={onToggle}
    >
      {colorMode === 'light' ? 'sombre' : 'clair'}
    </Button>
  )
}
