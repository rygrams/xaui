import { View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Page, usePageLeave } from '@xaui/tram/page'
import type { TramPageTransition } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'

/** The page the `Page` demo opens: it arrives, and leaves backward on its own button. */
export default function TramPageDetailScreen() {
  const theme = useXAUITheme()
  const router = useRouter()
  const leave = usePageLeave()
  const { app = 'page', transition } = useLocalSearchParams<{
    app?: string
    transition?: TramPageTransition
  }>()

  return (
    <Page transition={transition}>
      <View style={{ flex: 1, padding: 24, gap: 12 }}>
        <Typography variant="page" accessibilityRole="header">
          {app}
        </Typography>
        <Typography color={theme.colors.muted}>
          Cette page est arrivée après que la précédente a fini de sortir.
        </Typography>
        <View style={{ flexDirection: 'row', marginTop: 24 }}>
          <Button
            variant="outline"
            onPress={() => leave(() => router.back(), 'backward')}
          >
            retour
          </Button>
        </View>
      </View>
    </Page>
  )
}
