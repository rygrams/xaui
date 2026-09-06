import { Stack } from 'expo-router'
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
 */
export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <XAUIProvider colorMode={colorScheme === 'dark' ? 'dark' : 'light'}>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'XAUI (v1)' }} />
          <Stack.Screen name="accordion" options={{ title: 'Accordion (v1)' }} />
          <Stack.Screen name="alert" options={{ title: 'Alert (v1)' }} />
          <Stack.Screen name="avatar" options={{ title: 'Avatar (v1)' }} />
          <Stack.Screen name="badge" options={{ title: 'Badge (v1)' }} />
          <Stack.Screen
            name="bottom-sheet"
            options={{ title: 'BottomSheet (v1)' }}
          />
          <Stack.Screen name="button" options={{ title: 'Button (v1)' }} />
          <Stack.Screen name="calendar" options={{ title: 'Calendar (v1)' }} />
          <Stack.Screen name="card" options={{ title: 'Card (v1)' }} />
          <Stack.Screen name="checkbox" options={{ title: 'Checkbox (v1)' }} />
          <Stack.Screen name="chip" options={{ title: 'Chip (v1)' }} />
          <Stack.Screen name="date-field" options={{ title: 'DateField (v1)' }} />
          <Stack.Screen name="dialog" options={{ title: 'Dialog (v1)' }} />
          <Stack.Screen name="divider" options={{ title: 'Divider (v1)' }} />
          <Stack.Screen name="field-group" options={{ title: 'FieldGroup (v1)' }} />
          <Stack.Screen name="icon" options={{ title: 'Icon (v1)' }} />
          <Stack.Screen name="input-otp" options={{ title: 'InputOTP (v1)' }} />
          <Stack.Screen name="menu" options={{ title: 'Menu (v1)' }} />
          <Stack.Screen name="popover" options={{ title: 'Popover (v1)' }} />
          <Stack.Screen
            name="pressable-feedback"
            options={{ title: 'PressableFeedback (v1)' }}
          />
          <Stack.Screen name="radio" options={{ title: 'Radio (v1)' }} />
          <Stack.Screen name="select" options={{ title: 'Select (v1)' }} />
          <Stack.Screen name="skeleton" options={{ title: 'Skeleton (v1)' }} />
          <Stack.Screen name="slider" options={{ title: 'Slider (v1)' }} />
          <Stack.Screen name="spinner" options={{ title: 'Spinner (v1)' }} />
          <Stack.Screen name="stepper" options={{ title: 'Stepper (v1)' }} />
          <Stack.Screen name="surface" options={{ title: 'Surface (v1)' }} />
          <Stack.Screen name="switch" options={{ title: 'Switch (v1)' }} />
          <Stack.Screen name="tabs" options={{ title: 'Tabs (v1)' }} />
          <Stack.Screen name="tag-group" options={{ title: 'TagGroup (v1)' }} />
          <Stack.Screen name="text-area" options={{ title: 'TextArea (v1)' }} />
          <Stack.Screen name="text-field" options={{ title: 'TextField (v1)' }} />
          <Stack.Screen name="toast" options={{ title: 'Toast (v1)' }} />
          <Stack.Screen name="typography" options={{ title: 'Typography (v1)' }} />
          <Stack.Screen name="view" options={{ title: 'Layout (v1)' }} />
        </Stack>
      </XAUIProvider>
    </GestureHandlerRootView>
  )
}
