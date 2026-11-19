import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Spinner } from '@xaui/tram/spinner'
import type { SpinnerSize } from '@xaui/tram/spinner'
import type { TramAccentName } from '@xaui/tram/theme'
import { Typography } from '@xaui/tram/typography'
import { TramSection } from '../../components/tram-section'

const SIZES: SpinnerSize[] = ['sm', 'md', 'lg']

const ACCENTS: TramAccentName[] = ['lime', 'magenta', 'amber']

/**
 * Where the Tram `Spinner` is verified, in dark and in light, and with motion reduced: the
 * Metro run at every size, painted by a named accent, a raw colour and the page's ink, and
 * still.
 */
export default function TramSpinnerScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32 }}
    >
      <TramSection
        title="la course"
        note="Cinq points ronds empilés partent l'un après l'autre, lents, puis vite par le haut, et ralentissent en arrivant une heure plus loin, où chacun est rattrapé par le suivant : les cinq ne font plus qu'un, puis le premier repart. Ils se rejoignent à six heures, puis à sept, à huit, et font le tour du cadran en douze tours. Avec les animations réduites, les cinq tournent lentement, répartis."
      >
        <Row>
          {SIZES.map(size => (
            <Spinner
              key={size}
              size={size}
              accessibilityLabel={`chargement, ${size}`}
            />
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="en couleur"
        note="Un point est un aplat : l'accent dans sa vraie couleur. Puis une couleur brute, et l'encre de la page."
      >
        <Row>
          {ACCENTS.map(accent => (
            <Spinner key={accent} accent={accent} accessibilityLabel={accent} />
          ))}
          <Spinner color="#7c3aed" accessibilityLabel="brut" />
          <Spinner color={theme.colors.foreground} accessibilityLabel="encre" />
        </Row>
      </TramSection>

      <TramSection
        title="à côté d'un texte"
        note="sm, dans la ligne qu'il accompagne."
      >
        <Row>
          <Spinner size="sm" accessibilityLabel="synchronisation" />
          <Typography variant="body">synchronisation…</Typography>
        </Row>
      </TramSection>

      <TramSection
        title="immobile"
        note="animation={false} : les cinq à l'arrêt, répartis sur l'anneau. La place ne change pas."
      >
        <Row>
          {SIZES.map(size => (
            <Spinner
              key={size}
              size={size}
              animation={false}
              accessibilityLabel={`immobile, ${size}`}
            />
          ))}
        </Row>
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
      {children}
    </View>
  )
}
