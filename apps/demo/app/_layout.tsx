import { useState } from 'react'
import { Stack } from 'expo-router'
import { Button } from '@xaui/native/button'
import { Scaffold } from '@xaui/native/scaffold'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { XAUIProvider } from '@xaui/native/theme'

/**
 * The whole demo. One screen per v1 component, and nothing else in the way — the app
 * exists to answer "does this component render correctly, in light and in dark", which is
 * how a component is verified in this repository.
 *
 * `useColorScheme` comes from React Native rather than a local hook: the demo has one
 * source of truth for the mode, and it is the one `XAUIProvider` reads.
 *
 * The chrome — the ground, the status bar and the navigator's header — is the `Scaffold`,
 * which is also how that component is verified: this app's own header *is* what it
 * resolved. It reads the theme, so it sits under the provider; the `Stack` stays the app's
 * and is handed to `Scaffold.Navigator` rather than rendered by the library.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [mode, setMode] = useState<'light' | 'dark' | null>(null)
  const colorMode = mode ?? (colorScheme === 'dark' ? 'dark' : 'light')

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <XAUIProvider colorMode={colorMode}>
        <Scaffold>
          <Scaffold.StatusBar />
          <Scaffold.Navigator>
            {/* Which control flips the mode, and where it sits, is the app's — the merge
                puts the theme's options under these, so this key passes through. */}
            <Stack
              screenOptions={{
                headerRight: () => (
                  <Button
                    size="xs"
                    variant="secondary"
                    accessibilityLabel="Changer le thème"
                    onPress={() => setMode(colorMode === 'light' ? 'dark' : 'light')}
                  >
                    {colorMode === 'light' ? 'Dark' : 'Light'}
                  </Button>
                ),
              }}
            >
              <Stack.Screen name="index" options={{ title: 'XAUI (v1)' }} />
              <Stack.Screen name="accordion" options={{ title: 'Accordion (v1)' }} />
              <Stack.Screen name="alert" options={{ title: 'Alert (v1)' }} />
              <Stack.Screen
                name="agenda-calendar"
                options={{ title: 'AgendaCalendar (v1)' }}
              />
              <Stack.Screen
                name="autocomplete"
                options={{ title: 'Autocomplete (v1)' }}
              />
              <Stack.Screen name="avatar" options={{ title: 'Avatar (v1)' }} />
              <Stack.Screen name="badge" options={{ title: 'Badge (v1)' }} />
              <Stack.Screen
                name="bottom-sheet"
                options={{ title: 'BottomSheet (v1)' }}
              />
              <Stack.Screen name="button" options={{ title: 'Button (v1)' }} />
              <Stack.Screen name="calendar" options={{ title: 'Calendar (v1)' }} />
              <Stack.Screen name="card" options={{ title: 'Card (v1)' }} />
              <Stack.Screen name="carousel" options={{ title: 'Carousel (v1)' }} />
              <Stack.Screen name="checkbox" options={{ title: 'Checkbox (v1)' }} />
              <Stack.Screen name="charts" options={{ title: 'Charts (v1)' }} />
              <Stack.Screen name="chip" options={{ title: 'Chip (v1)' }} />
              <Stack.Screen
                name="close-button"
                options={{ title: 'CloseButton (v1)' }}
              />
              <Stack.Screen
                name="color-picker"
                options={{ title: 'ColorPicker (v1)' }}
              />
              <Stack.Screen name="combobox" options={{ title: 'Combobox (v1)' }} />
              <Stack.Screen
                name="date-picker"
                options={{ title: 'DatePicker (v1)' }}
              />
              <Stack.Screen
                name="date-range-picker"
                options={{ title: 'DateRangePicker (v1)' }}
              />
              <Stack.Screen
                name="date-time-picker"
                options={{ title: 'DateTimePicker (v1)' }}
              />
              <Stack.Screen name="dialog" options={{ title: 'Dialog (v1)' }} />
              <Stack.Screen name="divider" options={{ title: 'Divider (v1)' }} />
              <Stack.Screen
                name="dummy-field"
                options={{ title: 'DummyField (v1)' }}
              />
              <Stack.Screen
                name="empty-state"
                options={{ title: 'EmptyState (v1)' }}
              />
              <Stack.Screen name="fab" options={{ title: 'Fab (v1)' }} />
              <Stack.Screen
                name="field-group"
                options={{ title: 'FieldGroup (v1)' }}
              />
              <Stack.Screen name="flip-card" options={{ title: 'FlipCard (v1)' }} />
              <Stack.Screen name="icon" options={{ title: 'Icon (v1)' }} />
              <Stack.Screen name="input-otp" options={{ title: 'InputOTP (v1)' }} />
              <Stack.Screen name="list" options={{ title: 'List (v1)' }} />
              <Stack.Screen name="list-box" options={{ title: 'ListBox (v1)' }} />
              <Stack.Screen
                name="mask-field"
                options={{ title: 'MaskField (v1)' }}
              />
              <Stack.Screen
                name="number-field"
                options={{ title: 'NumberField (v1)' }}
              />
              <Stack.Screen
                name="number-stepper"
                options={{ title: 'NumberStepper (v1)' }}
              />
              <Stack.Screen
                name="number-pad"
                options={{ title: 'NumberPad (v1)' }}
              />
              <Stack.Screen name="menu" options={{ title: 'Menu (v1)' }} />
              <Stack.Screen
                name="morph-button"
                options={{ title: 'MorphButton (v1)' }}
              />
              <Stack.Screen name="pager" options={{ title: 'Pager (v1)' }} />
              <Stack.Screen
                name="pager-full"
                options={{ title: 'Pager plein écran (v1)' }}
              />
              <Stack.Screen name="popover" options={{ title: 'Popover (v1)' }} />
              <Stack.Screen
                name="pressable-feedback"
                options={{ title: 'PressableFeedback (v1)' }}
              />
              <Stack.Screen
                name="progress-bar"
                options={{ title: 'ProgressBar (v1)' }}
              />
              <Stack.Screen
                name="progress-circle"
                options={{ title: 'ProgressCircle (v1)' }}
              />
              <Stack.Screen name="radio" options={{ title: 'Radio (v1)' }} />
              <Stack.Screen name="rating" options={{ title: 'Rating (v1)' }} />
              <Stack.Screen
                name="search-field"
                options={{ title: 'SearchField (v1)' }}
              />
              <Stack.Screen name="scaffold" options={{ title: 'Scaffold (v1)' }} />
              <Stack.Screen name="segment" options={{ title: 'Segment (v1)' }} />
              <Stack.Screen name="select" options={{ title: 'Select (v1)' }} />
              <Stack.Screen name="snackbar" options={{ title: 'Snackbar (v1)' }} />
              <Stack.Screen name="skeleton" options={{ title: 'Skeleton (v1)' }} />
              <Stack.Screen
                name="slide-button"
                options={{ title: 'SlideButton (v1)' }}
              />
              <Stack.Screen name="slider" options={{ title: 'Slider (v1)' }} />
              <Stack.Screen name="spinner" options={{ title: 'Spinner (v1)' }} />
              <Stack.Screen name="stepper" options={{ title: 'Stepper (v1)' }} />
              <Stack.Screen name="surface" options={{ title: 'Surface (v1)' }} />
              <Stack.Screen name="switch" options={{ title: 'Switch (v1)' }} />
              <Stack.Screen name="table" options={{ title: 'Table (v1)' }} />
              <Stack.Screen name="tabs" options={{ title: 'Tabs (v1)' }} />
              <Stack.Screen name="tag-group" options={{ title: 'TagGroup (v1)' }} />
              <Stack.Screen name="text-area" options={{ title: 'TextArea (v1)' }} />
              <Stack.Screen
                name="text-field"
                options={{ title: 'TextField (v1)' }}
              />
              <Stack.Screen
                name="phone-number-field"
                options={{ title: 'PhoneNumberField (v1)' }}
              />
              <Stack.Screen name="timeline" options={{ title: 'Timeline (v1)' }} />
              <Stack.Screen
                name="time-picker"
                options={{ title: 'TimePicker (v1)' }}
              />
              <Stack.Screen name="toast" options={{ title: 'Toast (v1)' }} />
              <Stack.Screen
                name="toggle-button"
                options={{ title: 'ToggleButton (v1)' }}
              />
              <Stack.Screen
                name="typography"
                options={{ title: 'Typography (v1)' }}
              />
              <Stack.Screen
                name="wheel-picker"
                options={{ title: 'WheelPicker (v1)' }}
              />
              <Stack.Screen name="view" options={{ title: 'Layout (v1)' }} />
              <Stack.Screen name="widget" options={{ title: 'Widget (v1)' }} />
            </Stack>
          </Scaffold.Navigator>
        </Scaffold>
      </XAUIProvider>
    </GestureHandlerRootView>
  )
}
