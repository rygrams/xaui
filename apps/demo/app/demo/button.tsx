import { LogBox, Text, useColorScheme, View } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router'
import { createTheme, XAUIProvider } from '@xaui/native/theme'
import { BUTTON_SCENES } from '@/demo/button/scenes'

// A warning toast in shot ruins a take; the verification screens keep LogBox.
LogBox.ignoreAllLogs()

/** The video's single accent, so the phone does not bring a second one into the frame. */
const videoTheme = createTheme({
  colors: { light: { accent: '#0A84FF' }, dark: { accent: '#0A84FF' } },
})

/**
 * The Button video's scenes, one per `?scene=` value, with the navigator's header off:
 * each screen draws its own title so the frame holds nothing the storyboard did not plan.
 */
export default function ButtonVideoScreen() {
  const { scene } = useLocalSearchParams<{ scene?: string }>()
  const colorScheme = useColorScheme()
  const Scene = scene ? BUTTON_SCENES[scene] : undefined

  return (
    <XAUIProvider
      theme={videoTheme}
      colorMode={colorScheme === 'dark' ? 'dark' : 'light'}
      hasPortalHost={false}
    >
      <Stack.Screen options={{ headerShown: false, animation: 'none' }} />
      {Scene ? (
        <Scene key={scene} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>
            Unknown scene “{scene}”. Expected one of:{' '}
            {Object.keys(BUTTON_SCENES).join(', ')}
          </Text>
        </View>
      )}
    </XAUIProvider>
  )
}
