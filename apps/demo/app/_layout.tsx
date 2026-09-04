import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { PortalHost } from '@xaui/native/system'
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
        <PortalHost>
          <Stack>
            <Stack.Screen name="index" options={{ title: 'Button (v1)' }} />
            <Stack.Screen name="alert" options={{ title: 'Alert (v1)' }} />
            <Stack.Screen name="checkbox" options={{ title: 'Checkbox (v1)' }} />
            <Stack.Screen name="chip" options={{ title: 'Chip (v1)' }} />
            <Stack.Screen name="input" options={{ title: 'Input (v1)' }} />
            <Stack.Screen
              name="input-group"
              options={{ title: 'InputGroup (v1)' }}
            />
            <Stack.Screen name="input-otp" options={{ title: 'InputOTP (v1)' }} />
            <Stack.Screen name="radio" options={{ title: 'Radio (v1)' }} />
            <Stack.Screen name="switch" options={{ title: 'Switch (v1)' }} />
            <Stack.Screen name="text-area" options={{ title: 'TextArea (v1)' }} />
            <Stack.Screen name="spinner" options={{ title: 'Spinner (v1)' }} />
            <Stack.Screen
              name="pressable-feedback"
              options={{ title: 'PressableFeedback (v1)' }}
            />
          </Stack>
        </PortalHost>
      </XAUIProvider>
    </GestureHandlerRootView>
  )
}
