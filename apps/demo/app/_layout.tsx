import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import 'react-native-reanimated'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { defaultDarkTheme, defaultTheme } from '@xaui/core/theme'
import { XUIProvider } from '@xaui/native/core'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
      <XUIProvider theme={defaultTheme} darkTheme={defaultDarkTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />
          <Stack.Screen name="alerts" options={{ title: 'Alert Examples' }} />
        </Stack>
      </XUIProvider>
    </ThemeProvider>
  )
}
