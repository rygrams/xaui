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
          <Stack.Screen name="accordion" options={{ title: 'Accordion Examples' }} />
          <Stack.Screen name="alerts" options={{ title: 'Alert Examples' }} />
          <Stack.Screen name="avatars" options={{ title: 'Avatar Examples' }} />
          <Stack.Screen name="badges" options={{ title: 'Badge Examples' }} />
          <Stack.Screen
            name="bottom-sheet"
            options={{ title: 'Bottom Sheet Examples' }}
          />
          <Stack.Screen name="buttons" options={{ title: 'Button Examples' }} />
          <Stack.Screen name="card" options={{ title: 'Card Examples' }} />
          <Stack.Screen name="carousel" options={{ title: 'Carousel Examples' }} />
          <Stack.Screen name="chips" options={{ title: 'Chip Examples' }} />
          <Stack.Screen
            name="datepicker"
            options={{ title: 'DatePicker Examples' }}
          />
          <Stack.Screen name="fab" options={{ title: 'FAB Examples' }} />
          <Stack.Screen name="menus" options={{ title: 'Menu Examples' }} />
          <Stack.Screen
            name="segment-buttons"
            options={{ title: 'Segment Button Examples' }}
          />
          <Stack.Screen name="switch" options={{ title: 'Switch Examples' }} />
          <Stack.Screen name="progress" options={{ title: 'Progress Examples' }} />
          <Stack.Screen
            name="indicator"
            options={{ title: 'Indicator Examples' }}
          />
        </Stack>
      </XUIProvider>
    </ThemeProvider>
  )
}
