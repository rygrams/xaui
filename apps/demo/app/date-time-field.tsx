import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DateTimeField } from '@xaui/native/date-time-field'
import { FieldGroup } from '@xaui/native/field-group'
import { useXAUITheme } from '@xaui/native/theme'

const FRENCH_DATE = { day: 'JJ', month: 'MM', year: 'AAAA' }
const FRENCH_TIME = { hours: 'HH', minutes: 'mm', seconds: 'ss' }

/**
 * The verification screen for the `DateTimeField`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 */
export default function DateTimeFieldScreen() {
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
        title="Une seule boîte, pas deux champs côte à côte"
        note="Un moment est une seule valeur, et deux boîtes obligent le lecteur à tabuler entre elles, à décider à laquelle une erreur appartient, et à tenir la moitié d'un moment pendant ce temps. Le masque est les deux masques en séquence sur un seul flux de chiffres : les huit premiers sont la date, le reste est l'heure."
      >
        <DateTimeField
          locale="fr-FR"
          segmentLabels={FRENCH_DATE}
          timeLabels={FRENCH_TIME}
          onValueChange={setTyped}
        >
          <DateTimeField.Label>Début de l’événement</DateTimeField.Label>
          <DateTimeField.Field />
          <DateTimeField.Description>
            Essayez 0495199514753 : le mois plafonne à 12 et les minutes à 59.
          </DateTimeField.Description>
        </DateTimeField>

        <Read label="onValueChange" value={typed} />
      </Section>

      <Section
        title="Les deux moitiés doivent être entières et réelles"
        note="Une date complète à côté d'une heure à moitié tapée n'est pas un moment, et le 31 février à midi non plus."
      >
        <DateTimeField
          locale="fr-FR"
          segmentLabels={FRENCH_DATE}
          timeLabels={FRENCH_TIME}
        >
          <DateTimeField.Label>Essayez 31/02/1995 14:30</DateTimeField.Label>
          <DateTimeField.Field />
        </DateTimeField>
      </Section>

      <Section
        title="Douze heures, et la période à côté"
        note="Le TimeField.Period, sur le champ qui porte aussi une date. Sur un champ en 24 h il ne rend rien."
      >
        <DateTimeField locale="en-US" onValueChange={setTwelve}>
          <DateTimeField.Label>Starts at</DateTimeField.Label>
          <FieldGroup>
            <DateTimeField.Field />
            <DateTimeField.Period accessibilityLabel="Matin ou après-midi" />
          </FieldGroup>
        </DateTimeField>

        <Read label="onValueChange" value={twelve} />
      </Section>

      <Section
        title="Jusqu'aux secondes, et en ISO"
        note="granularity et order bougent la forme, la largeur du masque et la longueur du champ ensemble."
      >
        <DateTimeField order="YMD" separator="-" granularity="second" hourCycle={24}>
          <DateTimeField.Label>Horodatage</DateTimeField.Label>
          <DateTimeField.Field />
        </DateTimeField>
      </Section>

      <Section
        title="Contrôlé"
        note="value prime sur le texte, et seulement quand les deux ne désignent pas le même moment."
      >
        <DateTimeField
          locale="fr-FR"
          segmentLabels={FRENCH_DATE}
          timeLabels={FRENCH_TIME}
          value={driven}
          onValueChange={setDriven}
        >
          <DateTimeField.Label>Rendez-vous</DateTimeField.Label>
          <DateTimeField.Field />
        </DateTimeField>

        <Read label="value" value={driven} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Poke label="Maintenant" onPress={() => setDriven(new Date())} />
          <Poke
            label="4 juillet 1995, 14:30"
            onPress={() => setDriven(new Date(1995, 6, 4, 14, 30))}
          />
          <Poke label="Vider" onPress={() => setDriven(null)} />
        </View>
      </Section>

      <Section
        title="C'est un TextField"
        note="La même racine, les mêmes variantes, le même isInvalid, la même teinte."
      >
        <DateTimeField
          isInvalid
          locale="fr-FR"
          segmentLabels={FRENCH_DATE}
          timeLabels={FRENCH_TIME}
        >
          <DateTimeField.Label>Fin de l’événement</DateTimeField.Label>
          <DateTimeField.Field />
          <DateTimeField.Error>Avant le début.</DateTimeField.Error>
        </DateTimeField>

        <DateTimeField
          isDisabled
          defaultValue={new Date(1995, 6, 4, 9, 0)}
          locale="fr-FR"
          segmentLabels={FRENCH_DATE}
          timeLabels={FRENCH_TIME}
        >
          <DateTimeField.Label>Verrouillé</DateTimeField.Label>
          <DateTimeField.Field />
        </DateTimeField>

        <DateTimeField
          variant="tertiary"
          color="#0ea5e9"
          locale="fr-FR"
          segmentLabels={FRENCH_DATE}
          timeLabels={FRENCH_TIME}
        >
          <DateTimeField.Label>Teinté</DateTimeField.Label>
          <DateTimeField.Field />
        </DateTimeField>
      </Section>
    </ScrollView>
  )
}

function Read({ label, value }: { label: string; value: Date | null }) {
  const theme = useXAUITheme()
  const shown =
    value === null ? 'null' : value.toISOString().slice(0, 16).replace('T', ' ')

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
