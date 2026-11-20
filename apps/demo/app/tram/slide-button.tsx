import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import { SlideButton } from '@xaui/tram/slide-button'
import type { SlideButtonSize } from '@xaui/tram/slide-button'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const SIZES: SlideButtonSize[] = ['sm', 'md', 'lg']

/** Two that take black on the accent, and two that take white. */
const ACCENTS: TramAccentName[] = ['lime', 'amber', 'magenta', 'cobalt']

function LockIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  )
}

/**
 * Where the Tram `SlideButton` is verified, in dark and in light: the bare string and the
 * composed slots, the three sizes, a controlled one re-armed by a `Button`, the threshold,
 * named accents, a raw `color`, and disabled at rest and confirmed.
 */
export default function TramSlideButtonScreen() {
  const theme = useXAUITheme()
  const [confirms, setConfirms] = useState(0)
  const [isReset, setIsReset] = useState(false)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="une chaîne"
        note={`Le texte seul compose la trace, le libellé et le pouce. Lâché avant 90 %, il revient ; au bout, la boîte se remplit. Confirmations : ${confirms}`}
      >
        <SlideButton onConfirm={() => setConfirms(count => count + 1)}>
          glisser pour déverrouiller
        </SlideButton>
      </TramSection>

      <TramSection
        title="les emplacements"
        note="Fill, Label et Thumb écrits à la main ; une icône dans le pouce remplace le chevron."
      >
        <SlideButton accessibilityLabel="glisser pour verrouiller">
          <SlideButton.Fill />
          <SlideButton.Label>glisser pour verrouiller</SlideButton.Label>
          <SlideButton.Thumb>
            <SlideButton.Icon as={LockIcon} />
          </SlideButton.Thumb>
        </SlideButton>
        <SlideButton>
          <SlideButton.Label>sans trace</SlideButton.Label>
          <SlideButton.Thumb />
        </SlideButton>
      </TramSection>

      <TramSection
        title="les tailles"
        note="sm, md, lg — 48, 56 et 64 de haut, un pouce large d'une hauteur de contrôle."
      >
        {SIZES.map(size => (
          <SlideButton key={size} size={size}>
            {`taille ${size}`}
          </SlideButton>
        ))}
      </TramSection>

      <TramSection
        title="contrôlé"
        note="isConfirmed vient de l'écran ; le bouton le remet à false et réarme le glissement."
      >
        <SlideButton isConfirmed={isReset} onConfirm={() => setIsReset(true)}>
          {isReset ? 'thème réinitialisé' : 'réinitialiser le thème'}
        </SlideButton>
        <Row>
          <Button
            variant="outline"
            size="sm"
            isDisabled={!isReset}
            onPress={() => setIsReset(false)}
          >
            annuler
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="le seuil"
        note="threshold={1} : il faut aller jusqu'au bout."
      >
        <SlideButton threshold={1}>jusqu’au bout</SlideButton>
      </TramSection>

      <TramSection
        title="accent"
        note="Le pouce et la boîte remplie prennent l'accent nommé ; le chevron et le libellé lisent noir sur le lime et l'ambre."
      >
        {ACCENTS.map(accent => (
          <SlideButton key={accent} accent={accent}>
            {accent}
          </SlideButton>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — ici le danger du thème."
      >
        <SlideButton color={theme.colors.danger}>glisser pour effacer</SlideButton>
      </TramSection>

      <TramSection
        title="désactivé"
        note="La ligne, le pouce et le libellé en gris, sans accent ; confirmé, la boîte est grise."
      >
        <SlideButton isDisabled>indisponible</SlideButton>
        <SlideButton isDisabled defaultConfirmed>
          déjà confirmé
        </SlideButton>
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
