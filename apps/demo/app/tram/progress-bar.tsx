import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { ProgressBar } from '@xaui/tram/progress-bar'
import type { ProgressBarSize } from '@xaui/tram/progress-bar'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: ProgressBarSize[] = ['sm', 'md', 'lg']

/** The three that are too light to read as a line on white, and two that are not. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'yellow', 'magenta', 'cobalt']

const STARTS: Record<ProgressBarSize, number> = { sm: 30, md: 55, lg: 70 }

/**
 * Where the Tram `ProgressBar` is verified, in dark and in light: the three sizes, a
 * value changed from outside, a range off 0–100, the five bubbles of the indeterminate
 * bar, the switch between the two, disabled, named accents, a raw `color`, `asChild`.
 */
export default function TramProgressBarScreen() {
  const theme = useXAUITheme()
  const [progress, setProgress] = useState(55)
  const [isWaiting, setIsWaiting] = useState(true)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les tailles"
        note="sm, md, lg — une barre de 8, 12 et 16, en gris doux, aux angles presque vifs."
      >
        {SIZES.map(size => (
          <ProgressBar key={size} size={size} value={STARTS[size]}>
            {size}
          </ProgressBar>
        ))}
      </TramSection>

      <TramSection
        title="une valeur qui change"
        note="Le remplissage rejoint sa valeur sur un ressort sans rebond ; animations réduites : 150 ms."
      >
        <ProgressBar value={progress}>téléchargement</ProgressBar>
        <ProgressBar
          size="sm"
          value={progress}
          accessibilityLabel="la même valeur"
        />
        <Row>
          {[0, 50, 100].map(target => (
            <Button
              key={target}
              variant="outline"
              size="sm"
              onPress={() => setProgress(target)}
            >
              {String(target)}
            </Button>
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="indéterminé"
        note="Cinq bulles qui entrent vite, se resserrent au milieu sans se chevaucher, et sortent. Animations réduites : les cinq en rang, immobiles."
      >
        {SIZES.map(size => (
          <ProgressBar key={size} size={size} isIndeterminate>
            {`connexion · ${size}`}
          </ProgressBar>
        ))}
      </TramSection>

      <TramSection
        title="d'un état à l'autre"
        note="La même barre, indéterminée puis à 60 %."
      >
        <ProgressBar value={60} isIndeterminate={isWaiting}>
          {isWaiting ? 'en attente' : 'envoi'}
        </ProgressBar>
        <Row>
          <Button
            variant="outline"
            size="sm"
            onPress={() => setIsWaiting(waiting => !waiting)}
          >
            {isWaiting ? 'démarrer' : 'attendre'}
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="une autre plage"
        note="minValue et maxValue hors de 0–100, et un format qui n'est pas un pourcentage."
      >
        <ProgressBar
          value={1250}
          minValue={0}
          maxValue={2000}
          formatOptions={{
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
          }}
        >
          collecte
        </ProgressBar>
        <ProgressBar value={7} minValue={5} maxValue={10}>
          <ProgressBar.Header>
            <ProgressBar.Label>étape</ProgressBar.Label>
            <ProgressBar.Value>3 sur 6</ProgressBar.Value>
          </ProgressBar.Header>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </TramSection>

      <TramSection title="désactivé" note="Remplissage et bulles gris, sans accent.">
        <ProgressBar isDisabled value={45}>
          suspendu
        </ProgressBar>
        <ProgressBar isDisabled isIndeterminate accent="magenta">
          en attente, suspendu
        </ProgressBar>
      </TramSection>

      <TramSection
        title="accent"
        note="Le remplissage est un aplat : la vraie couleur, même le jaune sur blanc."
      >
        {ACCENTS.map((accent, index) => (
          <ProgressBar key={accent} accent={accent} value={30 + index * 12}>
            {accent}
          </ProgressBar>
        ))}
        <ProgressBar
          accent="lime"
          isIndeterminate
          accessibilityLabel="lime, indéterminé"
        />
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — ici le danger du thème. Elle l'emporte sur accent."
      >
        <ProgressBar color={theme.colors.danger} accent="lime" value={85}>
          espace presque plein
        </ProgressBar>
      </TramSection>

      <TramSection
        title="props de style"
        note="Toute clé de ViewStyle est une prop. asChild : la racine est l'élément de l'appelant. animation={false} pose le remplissage."
      >
        <ProgressBar value={35} width="60%" opacity={0.7} radius="lg" />
        <ProgressBar asChild value={60} accent="orange">
          <View testID="progress-as-child" style={{ paddingVertical: 8 }}>
            <ProgressBar.Header>
              <ProgressBar.Label>asChild</ProgressBar.Label>
              <ProgressBar.Value />
            </ProgressBar.Header>
            <ProgressBar.Track>
              <ProgressBar.Fill animation={false} />
            </ProgressBar.Track>
          </View>
        </ProgressBar>
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {children}
    </View>
  )
}
