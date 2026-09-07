import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import { NumberStepper } from '@xaui/native/number-stepper'
import type {
  NumberStepperSize,
  NumberStepperVariant,
} from '@xaui/native/number-stepper'
import { Icon } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: NumberStepperVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
]
const SIZES: NumberStepperSize[] = ['xs', 'sm', 'md', 'lg']

/** The demo's own bin, so the icon-override case is a real icon and not a character. */
function TrashIcon({ size = 20, color = 'currentColor' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 11v5M14 11v5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

/**
 * The verification screen for the `NumberStepper`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it, though the arithmetic
 * under it is `utils/number.ts` and that has twenty.
 */
export default function NumberStepperScreen() {
  const theme = useXAUITheme()

  const [quantity, setQuantity] = useState<number | null>(0)
  const [basket, setBasket] = useState<number | null>(1)
  const [isRemoved, setIsRemoved] = useState(false)
  const [guests, setGuests] = useState<number | null>(2)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="La paire et sa pastille"
        note="La pastille est un slot, écrite en premier : elle est hors flux, donc sa place dans le JSX est ce qui la met sous le reste plutôt que par-dessus. Elle est resserrée en haut et en bas, et cet écart est la forme — une pastille aussi haute que ses boutons est un contrôle segmenté, qui dit « choisissez-en un » et non « encore un peu »."
      >
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
            Step {quantity ?? 0}
          </Text>
          <NumberStepper
            value={quantity}
            onValueChange={setQuantity}
            min={0}
            max={10}
          >
            <NumberStepper.Track />
            <NumberStepper.Decrement accessibilityLabel="Un de moins" />
            <NumberStepper.Value />
            <NumberStepper.Increment accessibilityLabel="Un de plus" />
          </NumberStepper>
        </View>
        <Read label="onValueChange" value={String(quantity)} />
      </Section>

      <Section
        title="Une corbeille au plancher"
        note="C'est children et un ternaire, pas une prop à soi. Le onPress du caller remplace le pas plutôt que de tourner à côté : retirer la ligne n'est pas aussi la décrémenter."
      >
        {isRemoved ? (
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
            Retiré du panier.{' '}
            <Text
              onPress={() => {
                setIsRemoved(false)
                setBasket(1)
              }}
              style={{ color: theme.colors.accent }}
            >
              Annuler
            </Text>
          </Text>
        ) : (
          <NumberStepper value={basket} onValueChange={setBasket} min={1} max={9}>
            <NumberStepper.Track />
            <NumberStepper.Decrement
              accessibilityLabel={
                basket === 1 ? 'Retirer du panier' : 'Un article de moins'
              }
              onPress={basket === 1 ? () => setIsRemoved(true) : undefined}
            >
              {basket === 1 ? (
                <Icon as={TrashIcon} size={18} color={theme.colors.danger} />
              ) : undefined}
            </NumberStepper.Decrement>
            <NumberStepper.Value />
            <NumberStepper.Increment accessibilityLabel="Un article de plus" />
          </NumberStepper>
        )}
        <Read label="onValueChange" value={String(basket)} />
      </Section>

      <Section
        title="Value — un enfant fonction pour l'unité"
        note="Sans enfant c'est la valeur passée par formatOptions, et un tiret cadratin tant qu'il n'y en a pas — un tiret et pas un zéro, parce qu'un stepper qu'on n'a jamais pressé ne tient rien plutôt que d'en tenir aucun."
      >
        <NumberStepper value={guests} onValueChange={setGuests} min={1} max={12}>
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un convive de moins" />
          <NumberStepper.Value>
            {value => `${value ?? 0} ${value === 1 ? 'convive' : 'convives'}`}
          </NumberStepper.Value>
          <NumberStepper.Increment accessibilityLabel="Un convive de plus" />
        </NumberStepper>

        <NumberStepper
          locale="fr-FR"
          step={0.5}
          min={0}
          max={5}
          defaultValue={1.5}
          formatOptions={{ style: 'unit', unit: 'liter', maximumFractionDigits: 1 }}
        >
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un demi-litre de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="Un demi-litre de plus" />
        </NumberStepper>

        <NumberStepper min={0} max={3}>
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="Un de plus" />
        </NumberStepper>
        <Read label="rien de pressé" value="—" />
      </Section>

      <Section
        title="Les quatre niveaux d'emphase"
        note="La variante peint les boutons, parce que c'est ce que vise un doigt. secondary est le surface surélevé sur la pastille douce — default y serait deux gris à une nuance l'un de l'autre, et le bouton cesserait de se lire comme surélevé. ghost n'a ni pastille ni ombre."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 6 }}>
            <Text
              style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}
            >
              {variant}
            </Text>
            <NumberStepper variant={variant} defaultValue={3} min={0} max={9}>
              <NumberStepper.Track />
              <NumberStepper.Decrement accessibilityLabel="Un de moins" />
              <NumberStepper.Value />
              <NumberStepper.Increment accessibilityLabel="Un de plus" />
            </NumberStepper>
          </View>
        ))}

        <NumberStepper color="#7c3aed" defaultValue={2} min={0} max={9}>
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="Un de plus" />
        </NumberStepper>
      </Section>

      <Section
        title="Les tailles, le rayon, l'état désactivé"
        note="size donne le diamètre des boutons, la hauteur de la pastille, les écarts et la typo — jamais la largeur. radius écrase le cercle."
      >
        {SIZES.map(size => (
          <NumberStepper key={size} size={size} defaultValue={7} min={0} max={9}>
            <NumberStepper.Track />
            <NumberStepper.Decrement accessibilityLabel="Un de moins" />
            <NumberStepper.Value />
            <NumberStepper.Increment accessibilityLabel="Un de plus" />
          </NumberStepper>
        ))}

        <NumberStepper radius="md" defaultValue={4} min={0} max={9}>
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="Un de plus" />
        </NumberStepper>

        <NumberStepper isDisabled defaultValue={4}>
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="Un de plus" />
        </NumberStepper>

        <NumberStepper defaultValue={5} min={5} max={5}>
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un de moins" />
          <NumberStepper.Value />
          <NumberStepper.Increment accessibilityLabel="Un de plus" />
        </NumberStepper>
        <Read label="min === max" value="les deux boutons sont éteints" />
      </Section>

      <Section
        title="Serré — le nombre cède, il ne passe pas par-dessus"
        note="Le nombre est la partie qui peut se permettre de perdre de la place : les boutons sont des cibles tactiles. Il se resserre puis se tronque, et les boutons restent au-dessus de lui quoi qu'il arrive."
      >
        <View style={{ width: 150 }}>
          <NumberStepper
            alignSelf="stretch"
            defaultValue={1234567}
            locale="fr-FR"
            step={1000}
          >
            <NumberStepper.Track />
            <NumberStepper.Decrement accessibilityLabel="Mille de moins" />
            <NumberStepper.Value flex={1} />
            <NumberStepper.Increment accessibilityLabel="Mille de plus" />
          </NumberStepper>
        </View>
      </Section>

      <Section
        title="Pleine largeur"
        note="Pas de prop fullWidth : la racine se serre sur son contenu, et alignSelf est une prop de style (R14) comme une autre."
      >
        <NumberStepper alignSelf="stretch" defaultValue={1} min={0} max={99}>
          <NumberStepper.Track />
          <NumberStepper.Decrement accessibilityLabel="Un de moins" />
          <NumberStepper.Value flex={1} />
          <NumberStepper.Increment accessibilityLabel="Un de plus" />
        </NumberStepper>
      </Section>
    </ScrollView>
  )
}

function Read({ label, value }: { label: string; value: string }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {label} : {value}
    </Text>
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
