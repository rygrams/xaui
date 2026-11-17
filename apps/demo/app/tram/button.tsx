import { useState } from 'react'
import type { ReactNode } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import type { IconComponentProps } from '@xaui/native/system'
import { XAUIProvider, useColorMode, useXAUITheme } from '@xaui/native/theme'
import { Button } from '@xaui/tram/button'
import type { ButtonSize, ButtonVariant } from '@xaui/tram/button'
import { createTramTheme, tramAccents, tramType } from '@xaui/tram/theme'

const VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
  'danger',
  'danger-soft',
]

const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg']

/** The three accents that take black text, and one that takes white. */
const ACCENTS = ['lime', 'amber', 'yellow', 'magenta'] as const

const THEMES = ACCENTS.map(name => ({
  name,
  theme: createTramTheme({ accent: name }),
}))

function PlusIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 4v16M4 12h16" stroke={color} strokeWidth={3} />
    </Svg>
  )
}

/**
 * Where the Tram `Button` is verified, in dark and in light: the seven variants, the four
 * sizes, the inverted press, the disabled and busy states, and a raw `color`.
 */
export default function TramButtonScreen() {
  const theme = useXAUITheme()
  const colorMode = useColorMode()
  const [count, setCount] = useState(0)
  const [isBusy, setIsBusy] = useState(true)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 24, gap: 32, paddingBottom: 96 }}
    >
      <Section
        title="les variantes"
        note={`Appuyer inverse les couleurs et réduit à 96 %. Appuis : ${count}`}
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
      </Section>

      <Section title="les tailles" note="32, 40, 48 et 56 — lg est Windows Phone.">
        <Row>
          {SIZES.map(size => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </Row>
        <Row>
          {SIZES.map(size => (
            <Button key={size} size={size} variant="tertiary">
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
              variant="secondary"
              isIconOnly
              accessibilityLabel={`ajouter, ${size}`}
            >
              <Button.Icon as={PlusIcon} />
            </Button>
          ))}
        </Row>
      </Section>

      <Section
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
      </Section>

      <Section title="occupé" note="Garde ses couleurs, ne répond plus à l'appui.">
        <Row>
          <Button isLoading={isBusy}>envoi</Button>
          <Button variant="tertiary" isLoading={isBusy}>
            <Button.Label>envoi</Button.Label>
            <Button.Spinner />
          </Button>
          <Button variant="ghost" onPress={() => setIsBusy(value => !value)}>
            {isBusy ? 'arrêter' : 'relancer'}
          </Button>
        </Row>
      </Section>

      <Section
        title="les accents"
        note="Le texte posé sur l'accent est calculé : noir sur lime, ambre et jaune."
      >
        {THEMES.map(({ name, theme: accentTheme }) => (
          <XAUIProvider
            key={name}
            theme={accentTheme}
            colorMode={colorMode}
            hasPortalHost={false}
          >
            <Row>
              <Button>{name}</Button>
              <Button variant="secondary">{name}</Button>
              <Button variant="ghost">{name}</Button>
            </Row>
          </XAUIProvider>
        ))}
      </Section>

      <Section
        title="color"
        note="Une teinte brute se pose là où la variante peint."
      >
        <Row>
          <Button color={tramAccents.violet}>plein</Button>
          <Button color={tramAccents.violet} variant="secondary">
            contour
          </Button>
          <Button color={tramAccents.violet} variant="ghost">
            texte
          </Button>
        </Row>
      </Section>

      <Section title="largeur" note="Sans largeur, il remplit une colonne.">
        <Button size="lg">continuer</Button>
        <Button size="lg" variant="tertiary" animation={false}>
          sans mouvement
        </Button>
      </Section>
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

type SectionProps = { title: string; note: string; children: ReactNode }

function Section({ title, note, children }: SectionProps) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 12 }}>
      <View style={{ gap: 2 }}>
        <Text
          style={{
            color: theme.colors.foreground,
            fontFamily: theme.fontFamilies.heading,
            fontSize: tramType.section.fontSize,
            fontWeight: '300',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: theme.colors.muted,
            fontFamily: theme.fontFamilies.body,
            fontSize: tramType.caption.fontSize,
          }}
        >
          {note}
        </Text>
      </View>
      {children}
    </View>
  )
}
