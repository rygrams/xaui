import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { FieldGroup } from '@xaui/native/field-group'
import { NumberField } from '@xaui/native/number-field'
import type { NumberFieldProps } from '@xaui/native/number-field'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<NumberFieldProps['variant']>
type FieldSize = NonNullable<NumberFieldProps['size']>

const VARIANTS: Variant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: FieldSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `NumberField`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 */
export default function NumberFieldScreen() {
  const theme = useXAUITheme()

  const [quantity, setQuantity] = useState<number | null>(1)
  const [price, setPrice] = useState<number | null>(19.9)
  const [bounded, setBounded] = useState<number | null>(null)
  const [driven, setDriven] = useState<number | null>(12)

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Le champ et sa paire de boutons"
        note="Les deux boutons sont des décorateurs de FieldGroup : c'est ce qui pose un contrôle par-dessus un champ et le mesure, donc la boîte reste le TextInput lui-même. Decrement prend le bord d'attaque et Increment le bord de fuite — la valeur est entre les deux, seule disposition où la paire se lit comme un contrôle."
      >
        <NumberField
          min={1}
          max={99}
          value={quantity}
          onValueChange={setQuantity}
          locale="fr-FR"
        >
          <NumberField.Label>Quantité</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Retirer un article" />
            <NumberField.Field textAlign="center" />
            <NumberField.Increment accessibilityLabel="Ajouter un article" />
          </FieldGroup>
          <NumberField.Description>Entre 1 et 99.</NumberField.Description>
        </NumberField>
        <Read label="onValueChange" value={String(quantity)} />

        <NumberField min={0} max={5} defaultValue={5} locale="fr-FR">
          <NumberField.Label>Au plafond — le plus est éteint</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un de moins" />
            <NumberField.Field textAlign="center" />
            <NumberField.Increment accessibilityLabel="Un de plus" />
          </FieldGroup>
        </NumberField>
      </Section>

      <Section
        title="formatOptions — Intl, tel quel"
        note="Hors édition la valeur est écrite par Intl. Au moment où le curseur entre dans la boîte elle est réécrite à plat, sans groupement : personne ne devrait avoir à retaper un signe euro."
      >
        <NumberField
          locale="fr-FR"
          step={0.5}
          min={0}
          formatOptions={{ style: 'currency', currency: 'EUR' }}
          value={price}
          onValueChange={setPrice}
        >
          <NumberField.Label>Prix</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Cinquante centimes de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="Cinquante centimes de plus" />
          </FieldGroup>
        </NumberField>
        <Read label="onValueChange" value={String(price)} />

        <NumberField
          locale="fr-FR"
          defaultValue={1234567}
          formatOptions={{ maximumFractionDigits: 0 }}
        >
          <NumberField.Label>Groupé — cliquez dedans</NumberField.Label>
          <NumberField.Field />
          <NumberField.Description>
            1 234 567 hors édition, 1234567 dedans.
          </NumberField.Description>
        </NumberField>

        <NumberField
          locale="en-US"
          step={0.25}
          defaultValue={2.5}
          formatOptions={{ style: 'unit', unit: 'liter', maximumFractionDigits: 2 }}
        >
          <NumberField.Label>Une unité, un pavé décimal</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un quart de litre de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="Un quart de litre de plus" />
          </FieldGroup>
        </NumberField>
      </Section>

      <Section
        title="Les bornes arrivent à la sortie, pas pendant la frappe"
        note="min={10} et un lecteur en route vers 15 tape d'abord un 1 : le brider là lui retirerait le clavier. Tant qu'on est dans le champ, onValueChange rapporte ce qui est réellement dans la boîte ; le clamp tombe au blur et à chaque pression d'un bouton."
      >
        <NumberField min={10} max={20} value={bounded} onValueChange={setBounded}>
          <NumberField.Label>
            Entre 10 et 20 — tapez 1, puis sortez
          </NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="Un de plus" />
          </FieldGroup>
        </NumberField>
        <Read label="onValueChange" value={String(bounded)} />

        <NumberField min={0} step={1}>
          <NumberField.Label>
            Vide, puis un plus — atterrit sur min
          </NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="Un de plus" />
          </FieldGroup>
        </NumberField>
      </Section>

      <Section
        title="Contrôlé"
        note="value présent veut dire contrôlé : le champ suit la valeur du dehors, et null est un champ vide."
      >
        <NumberField value={driven} onValueChange={setDriven} min={0} max={100}>
          <NumberField.Label>Piloté du dehors</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="Un de plus" />
          </FieldGroup>
        </NumberField>
        <Read label="value" value={String(driven)} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Poke label="0" onPress={() => setDriven(0)} />
          <Poke label="42" onPress={() => setDriven(42)} />
          <Poke label="Hors bornes (150)" onPress={() => setDriven(150)} />
          <Poke label="Vider" onPress={() => setDriven(null)} />
        </View>
      </Section>

      <Section
        title="C'est un TextField"
        note="La même racine, les mêmes quatre variantes, la même teinte, le même isInvalid. Seul le champ diffère, et les deux boutons sont en plus."
      >
        {VARIANTS.map(variant => (
          <NumberField key={variant} variant={variant} defaultValue={3}>
            <NumberField.Label>{variant}</NumberField.Label>
            <FieldGroup>
              <NumberField.Decrement accessibilityLabel="Un de moins" />
              <NumberField.Field textAlign="center" />
              <NumberField.Increment accessibilityLabel="Un de plus" />
            </FieldGroup>
          </NumberField>
        ))}
      </Section>

      <Section
        title="Les tailles"
        note="La hauteur, l'inset, les écarts, la typo — et la longueur des barres du plus et du moins, un cran au-dessus de la typo du champ."
      >
        {SIZES.map(size => (
          <NumberField key={size} size={size} defaultValue={7}>
            <NumberField.Label>{size}</NumberField.Label>
            <FieldGroup>
              <NumberField.Decrement accessibilityLabel="Un de moins" />
              <NumberField.Field textAlign="center" />
              <NumberField.Increment accessibilityLabel="Un de plus" />
            </FieldGroup>
          </NumberField>
        ))}
      </Section>

      <Section
        title="L'étiquette dedans, l'erreur, l'état désactivé, la teinte"
        note="isInvalid peint la bordure et l'étiquette en danger et coupe le traitement du focus. isDisabled éteint le champ et ses deux boutons d'un coup."
      >
        <NumberField labelPlacement="inside" defaultValue={12}>
          <NumberField.Label>Effectif</NumberField.Label>
          <NumberField.Field />
        </NumberField>

        <NumberField isInvalid defaultValue={0} min={1}>
          <NumberField.Label>Places</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="Un de plus" />
          </FieldGroup>
          <NumberField.Error>Il en faut au moins une.</NumberField.Error>
        </NumberField>

        <NumberField isDisabled defaultValue={4}>
          <NumberField.Label>Verrouillé</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un de moins" />
            <NumberField.Field />
            <NumberField.Increment accessibilityLabel="Un de plus" />
          </FieldGroup>
        </NumberField>

        <NumberField color="#e11d48" defaultValue={9}>
          <NumberField.Label>Teinté</NumberField.Label>
          <FieldGroup>
            <NumberField.Decrement accessibilityLabel="Un de moins" />
            <NumberField.Field textAlign="center" />
            <NumberField.Increment accessibilityLabel="Un de plus" />
          </FieldGroup>
        </NumberField>
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

function Poke({ label, onPress }: { label: string; onPress: () => void }) {
  const theme = useXAUITheme()

  return (
    <Text
      onPress={onPress}
      style={{
        color: theme.colors.accent,
        fontSize: theme.fontSizes.xs,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: theme.radius.field,
        backgroundColor: theme.colors.default,
      }}
    >
      {label}
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
