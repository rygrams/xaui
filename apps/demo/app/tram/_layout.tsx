import { useMemo, useState } from 'react'
import { Stack, useIsFocused } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useColorMode } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { pageScreenOptions } from '@xaui/tram/page'
import { Scaffold, useScaffold } from '@xaui/tram/scaffold'
import type { ScaffoldVariant } from '@xaui/tram/scaffold'
import { TramProvider } from '@xaui/tram/theme'
import type { TramAccentName, TramHaptic } from '@xaui/tram/theme'
import { ToastHost } from '@xaui/tram/toast'
import {
  TramScaffoldChoiceProvider,
  useTramScaffoldChoice,
} from '../../components/tram-scaffold-choice'

/**
 * The `@xaui/tram` half of the demo: one screen per Tram component, each the place that
 * component is verified, in dark and in light.
 *
 * Everything under here reads the Tram theme, the header included: the `Scaffold` is
 * Tram's, and the `scaffold` screen dresses it — its variant and accent are held here,
 * because the bar it verifies is this layout's own.
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
  const [variant, setVariant] = useState<ScaffoldVariant>('ghost')
  const [accent, setAccent] = useState<TramAccentName | undefined>(undefined)
  const choice = useMemo(
    () => ({ variant, accent, setVariant, setAccent }),
    [variant, accent]
  )

  return (
    <TramProvider
      colorMode={colorMode}
      hasPortalHost={false}
      onHaptic={feel}
      pages={PAGES}
      safeArea={SAFE_AREA}
    >
      <ToastHost offset={Math.max(insets.top, 10)} dismissLabel="fermer">
        <TramScaffoldChoiceProvider value={choice}>
          <Scaffold variant={variant} accent={accent}>
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
                <Stack.Screen name="list" options={{ title: 'LIST' }} />
                <Stack.Screen name="list-box" options={{ title: 'LIST BOX' }} />
                <Stack.Screen name="jump-list" options={{ title: 'JUMP LIST' }} />
                <Stack.Screen
                  name="menu"
                  options={{ title: 'MENU', ...pageScreenOptions }}
                />
                <Stack.Screen
                  name="wheel-picker"
                  options={{ title: 'WHEEL PICKER' }}
                />
                <Stack.Screen
                  name="date-picker"
                  options={{ title: 'DATE PICKER' }}
                />
                <Stack.Screen
                  name="date-time-picker"
                  options={{ title: 'DATE TIME PICKER' }}
                />
                <Stack.Screen
                  name="time-picker"
                  options={{ title: 'TIME PICKER' }}
                />
                <Stack.Screen name="dialog" options={{ title: 'DIALOG' }} />
                <Stack.Screen name="fab" options={{ title: 'FAB' }} />
                <Stack.Screen
                  name="close-button"
                  options={{ title: 'CLOSE BUTTON' }}
                />
                <Stack.Screen name="toast" options={{ title: 'TOAST' }} />
                <Stack.Screen name="pivot" options={{ title: 'PIVOT' }} />
                <Stack.Screen name="tabs" options={{ title: 'TABS' }} />
                <Stack.Screen name="tile" options={{ title: 'TILE' }} />
                <Stack.Screen name="panorama" options={{ title: 'PANORAMA' }} />
                <Stack.Screen
                  name="toggle-button"
                  options={{ title: 'TOGGLE BUTTON' }}
                />
                <Stack.Screen name="typography" options={{ title: 'TYPOGRAPHY' }} />
                <Stack.Screen name="surface" options={{ title: 'SURFACE' }} />
                <Stack.Screen name="card" options={{ title: 'CARD' }} />
                <Stack.Screen name="spinner" options={{ title: 'SPINNER' }} />
                <Stack.Screen name="avatar" options={{ title: 'AVATAR' }} />
                <Stack.Screen name="divider" options={{ title: 'DIVIDER' }} />
                <Stack.Screen name="badge" options={{ title: 'BADGE' }} />
                <Stack.Screen name="chip" options={{ title: 'CHIP' }} />
                <Stack.Screen name="alert" options={{ title: 'ALERT' }} />
                <Stack.Screen name="skeleton" options={{ title: 'SKELETON' }} />
                <Stack.Screen
                  name="empty-state"
                  options={{ title: 'EMPTY STATE' }}
                />
                <Stack.Screen name="accordion" options={{ title: 'ACCORDION' }} />
                <Stack.Screen
                  name="search-field"
                  options={{ title: 'SEARCH FIELD' }}
                />
                <Stack.Screen
                  name="number-field"
                  options={{ title: 'NUMBER FIELD' }}
                />
                <Stack.Screen name="input-otp" options={{ title: 'INPUT OTP' }} />
                <Stack.Screen
                  name="bottom-sheet"
                  options={{ title: 'BOTTOM SHEET' }}
                />
                <Stack.Screen name="mask-field" options={{ title: 'MASK FIELD' }} />
                <Stack.Screen
                  name="autocomplete"
                  options={{ title: 'AUTOCOMPLETE' }}
                />
                <Stack.Screen name="combobox" options={{ title: 'COMBOBOX' }} />
                <Stack.Screen
                  name="field-group"
                  options={{ title: 'FIELD GROUP' }}
                />
                <Stack.Screen
                  name="phone-number-field"
                  options={{ title: 'PHONE NUMBER FIELD' }}
                />
                <Stack.Screen
                  name="dummy-field"
                  options={{ title: 'DUMMY FIELD' }}
                />
                <Stack.Screen
                  name="number-stepper"
                  options={{ title: 'NUMBER STEPPER' }}
                />
                <Stack.Screen name="rating" options={{ title: 'RATING' }} />
                <Stack.Screen name="number-pad" options={{ title: 'NUMBER PAD' }} />
                <Stack.Screen name="calendar" options={{ title: 'CALENDAR' }} />
                <Stack.Screen
                  name="range-calendar"
                  options={{ title: 'RANGE CALENDAR' }}
                />
                <Stack.Screen name="stepper" options={{ title: 'STEPPER' }} />
                <Stack.Screen name="timeline" options={{ title: 'TIMELINE' }} />
                <Stack.Screen
                  name="color-picker"
                  options={{ title: 'COLOR PICKER' }}
                />
                <Stack.Screen
                  name="slide-button"
                  options={{ title: 'SLIDE BUTTON' }}
                />
                <Stack.Screen name="table" options={{ title: 'TABLE' }} />
                <Stack.Screen
                  name="morph-button"
                  options={{ title: 'MORPH BUTTON' }}
                />
                <Stack.Screen name="carousel" options={{ title: 'CAROUSEL' }} />
                <Stack.Screen name="scaffold" options={{ title: 'SCAFFOLD' }} />
                <Stack.Screen name="charts" options={{ title: 'CHARTS' }} />
                <Stack.Screen name="view" options={{ title: 'VIEW' }} />
              </Stack>
            </Scaffold.Navigator>
          </Scaffold>
        </TramScaffoldChoiceProvider>
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
 * selection tick for a switch that flips, a medium impact for the hold that opens a
 * menu. At module level, so the provider is handed the same function on every render.
 *
 * Loaded on demand and allowed to fail: a binary built before `expo-haptics` was added
 * has no native module to load, and the web and the simulator have nothing to vibrate.
 */
function feel(moment: TramHaptic) {
  import('expo-haptics')
    .then(Haptics => {
      if (moment === 'selection') return Haptics.selectionAsync()

      return Haptics.impactAsync(
        moment === 'longPress'
          ? Haptics.ImpactFeedbackStyle.Medium
          : Haptics.ImpactFeedbackStyle.Light
      )
    })
    .catch(() => {})
}

type ModeToggleProps = {
  colorMode: 'light' | 'dark'
  onToggle: () => void
}

/**
 * Text alone, the Metro hyperlink: the Tram `Button`, in its `text` variant. On a filled
 * bar the accent's ink would not read — blue on a lime bar — so it takes the header's.
 */
function ModeToggle({ colorMode, onToggle }: ModeToggleProps) {
  const { variant } = useTramScaffoldChoice()
  const { screenOptions } = useScaffold()
  const isFilled = variant === 'primary' || variant === 'secondary'

  return (
    <Button
      variant="text"
      color={isFilled ? screenOptions.headerTintColor : undefined}
      size="sm"
      accessibilityLabel="Changer le thème"
      onPress={onToggle}
    >
      {colorMode === 'light' ? 'sombre' : 'clair'}
    </Button>
  )
}
