import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { FieldGroup } from '@xaui/native/field-group'
import { TimeField } from '@xaui/native/time-field'
import type { TimeFieldProps } from '@xaui/native/time-field'
import { useXAUITheme } from '@xaui/native/theme'

type Variant = NonNullable<TimeFieldProps['variant']>

const VARIANTS: Variant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const FRENCH = { hours: 'HH', minutes: 'mm', seconds: 'ss' }

/**
 * The verification screen for the `TimeField`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function TimeFieldScreen() {
  const theme = useXAUITheme()
  const [typed, setTyped] = useState<Date | null>(null)
  const [twelve, setTwelve] = useState<Date | null>(null)
  const [driven, setDriven] = useState<Date | null>(new Date(1995, 6, 4, 14, 30))

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Vingt-quatre heures"
        note="Le DateField, pour l'heure : une seule représentation — les chiffres, dans l'ordre — et maskTime est la seule chose qui en fait du texte. Chaque partie est plafonnée quand elle se complète et jamais relevée."
      >
        <TimeField locale="fr-FR" timeLabels={FRENCH} onValueChange={setTyped}>
          <TimeField.Label>Heure de début</TimeField.Label>
          <TimeField.Field />
          <TimeField.Description>Essayez 99 puis 75.</TimeField.Description>
        </TimeField>

        <Read label="onValueChange" value={typed} />
      </Section>

      <Section
        title="Douze heures, et la période à côté"
        note="La période ne se tape pas : le clavier qu'ouvre un champ d'heure est un pavé numérique, qui ne produit pas ces deux lettres — le champ legacy les demandait quand même. Deux moitiés de journée, c'est aussi un choix entre deux choses, donc une commande et non une valeur. Sur un champ en 24 h, TimeField.Period ne rend rien : le même JSX sert les deux."
      >
        <TimeField locale="en-US" onValueChange={setTwelve}>
          <TimeField.Label>Starts at</TimeField.Label>
          <FieldGroup>
            <TimeField.Field />
            <TimeField.Period accessibilityLabel="Matin ou après-midi" />
          </FieldGroup>
          <TimeField.Description>
            12 AM est minuit et 12 PM est midi — la somme naïve se trompe sur les
            deux.
          </TimeField.Description>
        </TimeField>

        <Read label="onValueChange" value={twelve} />
      </Section>

      <Section
        title="Jusqu'aux secondes"
        note="granularity dit jusqu'où l'heure est écrite. La longueur du champ suit, donc le curseur s'arrête au bout d'une heure finie."
      >
        <TimeField locale="fr-FR" timeLabels={FRENCH} granularity="second">
          <TimeField.Label>Chronomètre</TimeField.Label>
          <TimeField.Field />
        </TimeField>
      </Section>

      <Section
        title="Contrôlé, et le jour est gardé"
        note="La valeur est une Date : une heure seule tombe quand même sur un jour, et garder le type permet à la valeur d'un DateField de passer telle quelle. Le jour est celui déjà tenu — ici le 4 juillet 1995 — et non celui d'aujourd'hui."
      >
        <TimeField
          locale="fr-FR"
          timeLabels={FRENCH}
          value={driven}
          onValueChange={setDriven}
        >
          <TimeField.Label>Rendez-vous</TimeField.Label>
          <TimeField.Field />
        </TimeField>

        <Read label="value" value={driven} full />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Poke
            label="Midi"
            onPress={() => setDriven(new Date(1995, 6, 4, 12, 0))}
          />
          <Poke
            label="Minuit"
            onPress={() => setDriven(new Date(1995, 6, 4, 0, 0))}
          />
          <Poke label="Vider" onPress={() => setDriven(null)} />
        </View>
      </Section>

      <Section
        title="C'est un TextField"
        note="La même racine, les mêmes variantes, les mêmes tailles, la même teinte, le même isInvalid."
      >
        {VARIANTS.map(variant => (
          <TimeField
            key={variant}
            variant={variant}
            locale="fr-FR"
            timeLabels={FRENCH}
          >
            <TimeField.Label>{variant}</TimeField.Label>
            <TimeField.Field />
          </TimeField>
        ))}

        <TimeField isInvalid locale="fr-FR" timeLabels={FRENCH}>
          <TimeField.Label>Heure de fin</TimeField.Label>
          <TimeField.Field />
          <TimeField.Error>Avant l’heure de début.</TimeField.Error>
        </TimeField>

        <TimeField
          isDisabled
          defaultValue={new Date(2024, 0, 1, 9, 0)}
          locale="fr-FR"
          timeLabels={FRENCH}
        >
          <TimeField.Label>Verrouillée</TimeField.Label>
          <TimeField.Field />
        </TimeField>
      </Section>
    </ScrollView>
  )
}

function Read({
  label,
  value,
  full = false,
}: {
  label: string
  value: Date | null
  full?: boolean
}) {
  const theme = useXAUITheme()
  const shown =
    value === null
      ? 'null'
      : full
        ? value.toISOString().slice(0, 16).replace('T', ' ')
        : value.toTimeString().slice(0, 8)

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {label} : {shown}
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
