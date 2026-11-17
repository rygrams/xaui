import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import type { ButtonSize, ButtonVariant } from '@xaui/tram/button'
import type { TramAccentName } from '@xaui/tram/theme'
import { TramSection } from '../../components/tram-section'

const VARIANTS: ButtonVariant[] = ['contained', 'flat', 'outline', 'text']

const SIZES: ButtonSize[] = ['sm', 'md', 'lg']

/** The three accents that take black text, and three that take white. */
const ACCENTS: TramAccentName[] = [
  'lime',
  'amber',
  'yellow',
  'magenta',
  'violet',
  'emerald',
]

function PlusIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4v16M4 12h16" stroke={color} strokeWidth={3} />
    </Svg>
  )
}

/**
 * Where the Tram `Button` is verified, in dark and in light: the four variants, the three
 * sizes, the tilted press, the disabled and busy states, a named `accent` and a raw `color`.
 */
export default function TramButtonScreen() {
  const theme = useXAUITheme()
  const [count, setCount] = useState(0)
  const [isBusy, setIsBusy] = useState(true)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <TramSection
        title="les variantes"
        note={`Appuyer incline vers le doigt, sans changer les couleurs. Appuis : ${count}`}
      >
        <Row>
          {VARIANTS.map(variant => (
            <Button
              key={variant}
              variant={variant}
              onPress={() => setCount(value => value + 1)}
            >
              {variant}
            </Button>
          ))}
        </Row>
      </TramSection>

      <TramSection title="les tailles" note="40, 48 et 56 — lg est Windows Phone.">
        <Row>
          {SIZES.map(size => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </Row>
        <Row>
          {SIZES.map(size => (
            <Button key={size} size={size} variant="outline">
              <Button.Icon as={PlusIcon} />
              <Button.Label>ajouter</Button.Label>
            </Button>
          ))}
        </Row>
        <Row>
          {SIZES.map(size => (
            <Button
              key={size}
              size={size}
              variant="flat"
              isIconOnly
              accessibilityLabel={`ajouter, ${size}`}
            >
              <Button.Icon as={PlusIcon} />
            </Button>
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="désactivé"
        note="Le fond s'en va, le trait et le texte grisent."
      >
        <Row>
          {VARIANTS.map(variant => (
            <Button key={variant} variant={variant} isDisabled>
              {variant}
            </Button>
          ))}
        </Row>
      </TramSection>

      <TramSection
        title="occupé"
        note="Garde ses couleurs, ne répond plus à l'appui."
      >
        <Row>
          <Button isLoading={isBusy}>envoi</Button>
          <Button variant="outline" isLoading={isBusy}>
            <Button.Label>envoi</Button.Label>
            <Button.Spinner />
          </Button>
          <Button variant="text" onPress={() => setIsBusy(value => !value)}>
            {isBusy ? 'arrêter' : 'relancer'}
          </Button>
        </Row>
      </TramSection>

      <TramSection
        title="accent"
        note="Un nom de la palette. Plein, il porte du noir sur lime, ambre et jaune ; en trait ou en texte, il devient une encre lisible."
      >
        {ACCENTS.map(accent => (
          <Row key={accent}>
            {VARIANTS.map(variant => (
              <Button key={variant} variant={variant} accent={accent}>
                {accent}
              </Button>
            ))}
          </Row>
        ))}
      </TramSection>

      <TramSection
        title="color"
        note="Une teinte brute, hors palette — ici le danger du thème."
      >
        <Row>
          {VARIANTS.map(variant => (
            <Button key={variant} variant={variant} color={theme.colors.danger}>
              supprimer
            </Button>
          ))}
        </Row>
      </TramSection>

      <TramSection title="largeur" note="Sans largeur, il remplit une colonne.">
        <Button size="lg">continuer</Button>
        <Button size="lg" variant="outline" animation={false}>
          sans mouvement
        </Button>
      </TramSection>
    </ScrollView>
  )
}

function Row({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {children}
    </View>
  )
}
