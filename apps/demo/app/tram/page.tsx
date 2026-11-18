import { useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { Page, usePageLeave } from '@xaui/tram/page'
import type { TramPageTransition } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const TRANSITIONS: TramPageTransition[] = ['turnstile', 'slide', 'fade', 'none']

const APPS = ['courrier', 'musique', 'photos', 'réglages']

/**
 * Where the Tram `Page` is verified, in dark and in light: it arrives when the route is
 * pushed, turns away before it opens another, and comes back when that one is closed —
 * by its own button or by the header's. The four transitions, and reduced motion.
 */
export default function TramPageScreen() {
  const theme = useXAUITheme()
  const router = useRouter()
  const leave = usePageLeave()
  const [transition, setTransition] = useState<TramPageTransition>('turnstile')

  const open = (app: string) =>
    leave(() =>
      router.push({ pathname: '/tram/page-detail', params: { app, transition } })
    )

  return (
    <Page transition={transition}>
      <ScrollView
        contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
      >
        <TramSection
          title="ouvrir une page"
          note="La page pivote autour du bord de l'écran, puis la suivante arrive de l'autre côté."
        >
          <View style={{ gap: 12 }}>
            {APPS.map(app => (
              <Pressable
                key={app}
                accessibilityRole="link"
                onPress={() => open(app)}
                style={{ minHeight: 48, justifyContent: 'center' }}
              >
                <Typography variant="title">{app}</Typography>
              </Pressable>
            ))}
          </View>
        </TramSection>

        <TramSection
          title="la transition"
          note="turnstile par défaut, donnée au TramProvider ; une page peut avoir la sienne. Animations réduites : un fondu."
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {TRANSITIONS.map(name => (
              <Button
                key={name}
                size="sm"
                variant={name === transition ? 'contained' : 'outline'}
                onPress={() => setTransition(name)}
              >
                {name}
              </Button>
            ))}
          </View>
          <Typography variant="caption" color={theme.colors.muted}>
            Le retour du système ne joue pas de sortie : la page revient seule.
          </Typography>
        </TramSection>
      </ScrollView>
    </Page>
  )
}
