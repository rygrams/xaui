import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { Button } from '@xaui/native/button'
import { SlideButton } from '@xaui/native/slide-button'
import type { SlideButtonSize, SlideButtonVariant } from '@xaui/native/slide-button'
import type { IconComponentProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: SlideButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'success',
  'success-soft',
  'warning',
  'warning-soft',
  'danger',
  'danger-soft',
]

const SIZES: SlideButtonSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `SlideButton`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: a bare string composes the whole control,
 * the thumb runs a pan and springs home below the threshold, the ten variants name tokens
 * and the tint never touches the disc, `size` moves the height and the type and never a
 * width, `isConfirmed` drives and re-arms it, a mark in the thumb replaces the chevron,
 * and `isDisabled` stops the drag.
 */
export default function SlideButtonScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Une chaîne suffit"
        note="<SlideButton>Slide to confirm</SlideButton> compose le fill, le label et le thumb. Glissez le disque jusqu'au bout : onConfirm ne part qu'une fois, et en deçà du seuil le disque revient au départ."
      >
        <Confirmable />
      </Section>

      <Section
        title="Les slots écrits à la main"
        note="Le fill est optionnel, le thumb accepte une marque. L'ordre JSX est l'ordre d'empilement — le thumb en dernier passe au-dessus du label."
      >
        <SlideButton variant="primary" onConfirm={() => undefined}>
          <SlideButton.Fill />
          <SlideButton.Label>Glisser pour publier</SlideButton.Label>
          <SlideButton.Thumb>
            <SlideButton.Icon as={ArrowIcon} />
          </SlideButton.Thumb>
        </SlideButton>

        <SlideButton variant="secondary" onConfirm={() => undefined}>
          <SlideButton.Label>Sans fill</SlideButton.Label>
          <SlideButton.Thumb />
        </SlideButton>
      </Section>

      <Section
        title="Les dix variantes"
        note="Le même vocabulaire que le Button. La pilule prend le token de fond, le label son foreground ; le disque reste couleur de surface pour que le chevron soit toujours lisible."
      >
        {VARIANTS.map(variant => (
          <SlideButton key={variant} variant={variant} onConfirm={() => undefined}>
            {variant}
          </SlideButton>
        ))}
      </Section>

      <Section
        title="color — une teinte brute, placée par la variante"
        note="Le fond d'une primary, le label et la bordure d'une tertiary, le label d'une ghost. Jamais le disque."
      >
        <SlideButton color="#7c3aed" onConfirm={() => undefined}>
          Teinte sur la pilule
        </SlideButton>
        <SlideButton variant="tertiary" color="#0ea5e9" onConfirm={() => undefined}>
          Teinte sur le trait et le label
        </SlideButton>
        <SlideButton variant="ghost" color="#e11d48" onConfirm={() => undefined}>
          Teinte sur le label seul
        </SlideButton>
      </Section>

      <Section
        title="size — la hauteur et le type, jamais une largeur"
        note="Trois pas mesurés : la pilule remplit toujours sa colonne, c'est le diamètre du disque et la taille du label qui bougent."
      >
        {SIZES.map(size => (
          <SlideButton key={size} size={size} onConfirm={() => undefined}>
            size=&quot;{size}&quot;
          </SlideButton>
        ))}
      </Section>

      <Section
        title="threshold — jusqu'où glisser"
        note="0.5 : le disque n'a besoin d'atteindre que la moitié. 1 : il faut aller jusqu'au bout franc."
      >
        <SlideButton threshold={0.5} onConfirm={() => undefined}>
          Seuil à mi-course
        </SlideButton>
        <SlideButton threshold={1} onConfirm={() => undefined}>
          Seuil au bout
        </SlideButton>
      </Section>

      <Section
        title="isConfirmed — piloté, et ré-armable"
        note="Contrôlé, le disque suit la prop : true l'épingle au bout, false le ramène. Un one-shot devient réutilisable."
      >
        <Rearmable />
      </Section>

      <Section title="isDisabled" note="Estompé, et il ne prend pas le geste.">
        <SlideButton isDisabled onConfirm={() => undefined}>
          Indisponible
        </SlideButton>
      </Section>

      <Section
        title="danger — glisser pour supprimer"
        note="Le cas où le geste vaut la friction : rien ne part sur un appui accidentel."
      >
        <SlideButton variant="danger" onConfirm={() => undefined}>
          <SlideButton.Fill />
          <SlideButton.Label>Glisser pour tout effacer</SlideButton.Label>
          <SlideButton.Thumb>
            <SlideButton.Icon as={TrashIcon} />
          </SlideButton.Thumb>
        </SlideButton>
      </Section>
    </ScrollView>
  )
}

/** The uncontrolled one-shot: it confirms once and stays confirmed. */
function Confirmable() {
  const theme = useXAUITheme()
  const [count, setCount] = useState(0)

  return (
    <View style={{ gap: 10 }}>
      <SlideButton onConfirm={() => setCount(current => current + 1)}>
        Slide to confirm
      </SlideButton>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        onConfirm : {count}
      </Text>
    </View>
  )
}

/** Controlled: the button hands the state back and the demo re-arms it. */
function Rearmable() {
  const theme = useXAUITheme()
  const [confirmed, setConfirmed] = useState(false)

  return (
    <View style={{ gap: 10 }}>
      <SlideButton isConfirmed={confirmed} onConfirm={() => setConfirmed(true)}>
        {confirmed ? 'Confirmé' : 'Glisser pour confirmer'}
      </SlideButton>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setConfirmed(false)}
        style={{ alignSelf: 'flex-start' }}
      >
        Ré-armer
      </Button>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        isConfirmed : {String(confirmed)}
      </Text>
    </View>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 12 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {note}
      </Text>
      {children}
    </View>
  )
}

function ArrowIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

function TrashIcon({ size, color }: IconComponentProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0v12a1 1 0 001 1h8a1 1 0 001-1V7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
