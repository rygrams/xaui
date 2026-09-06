import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DateRangeField } from '@xaui/native/date-range-field'
import type { DateRange } from '@xaui/native/date-range-field'
import { useXAUITheme } from '@xaui/native/theme'

const FRENCH = { day: 'JJ', month: 'MM', year: 'AAAA' }
const EMPTY: DateRange = { start: null, end: null }

/**
 * The verification screen for the `DateRangeField`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 */
export default function DateRangeFieldScreen() {
  const theme = useXAUITheme()
  const [stay, setStay] = useState<DateRange>(EMPTY)
  const [driven, setDriven] = useState<DateRange>({
    start: new Date(1995, 6, 4),
    end: new Date(1995, 6, 11),
  })

  const backwards =
    driven.start !== null &&
    driven.end !== null &&
    driven.end.getTime() < driven.start.getTime()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Deux dates dans une boîte"
        note="Une période est une seule valeur. Le masque est maskDate deux fois sur un seul flux de chiffres — les huit premiers sont le début, le reste est la fin — donc toutes les règles de ce masque sont gardées et non recopiées. Le tiret apparaît au moment où le neuvième chiffre apparaît."
      >
        <DateRangeField
          locale="fr-FR"
          segmentLabels={FRENCH}
          onValueChange={setStay}
        >
          <DateRangeField.Label>Séjour</DateRangeField.Label>
          <DateRangeField.Field />
          <DateRangeField.Description>Arrivée et départ.</DateRangeField.Description>
        </DateRangeField>

        <Read label="début" value={stay.start} />
        <Read label="fin" value={stay.end} />
      </Section>

      <Section
        title="Les deux bouts sont rapportés indépendamment"
        note="Un lecteur qui a fini le début et qui est au milieu de la fin a un début, et un appelant qui filtre une liste peut s'en servir tout de suite. Attendre les deux rendrait le champ inerte jusqu'à son dernier chiffre — tapez 04071995 et regardez le début arriver seul."
      >
        <DateRangeField locale="en-US">
          <DateRangeField.Label>en-US — MM/DD/YYYY</DateRangeField.Label>
          <DateRangeField.Field />
        </DateRangeField>

        <DateRangeField order="YMD" separator="-">
          <DateRangeField.Label>ISO — YYYY-MM-DD</DateRangeField.Label>
          <DateRangeField.Field />
        </DateRangeField>
      </Section>

      <Section
        title="L'ordre des bouts n'est pas décidé ici"
        note="C'est une règle sur la période et non sur ce qui a été tapé, et elle change d'une fonctionnalité à l'autre : certaines périodes peuvent tenir sur un jour et d'autres non. isInvalid avec une erreur, c'est là que l'appelant le dit — le champ ci-dessous le fait."
      >
        <DateRangeField
          locale="fr-FR"
          segmentLabels={FRENCH}
          value={driven}
          onValueChange={setDriven}
          isInvalid={backwards}
        >
          <DateRangeField.Label>Période</DateRangeField.Label>
          <DateRangeField.Field />
          {backwards ? (
            <DateRangeField.Error>La fin est avant le début.</DateRangeField.Error>
          ) : null}
        </DateRangeField>

        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Poke
            label="Une semaine"
            onPress={() =>
              setDriven({ start: new Date(1995, 6, 4), end: new Date(1995, 6, 11) })
            }
          />
          <Poke
            label="À l'envers"
            onPress={() =>
              setDriven({ start: new Date(1995, 6, 11), end: new Date(1995, 6, 4) })
            }
          />
          <Poke label="Vider" onPress={() => setDriven(EMPTY)} />
        </View>
      </Section>

      <Section
        title="C'est un TextField"
        note="La même racine, les mêmes variantes, les mêmes tailles, la même teinte."
      >
        <DateRangeField variant="tertiary" locale="fr-FR" segmentLabels={FRENCH}>
          <DateRangeField.Label>tertiary</DateRangeField.Label>
          <DateRangeField.Field />
        </DateRangeField>

        <DateRangeField
          size="sm"
          color="#0ea5e9"
          locale="fr-FR"
          segmentLabels={FRENCH}
        >
          <DateRangeField.Label>Teinté, en sm</DateRangeField.Label>
          <DateRangeField.Field />
        </DateRangeField>

        <DateRangeField
          isDisabled
          defaultValue={{ start: new Date(1995, 6, 4), end: new Date(1995, 6, 11) }}
          locale="fr-FR"
          segmentLabels={FRENCH}
        >
          <DateRangeField.Label>Verrouillé</DateRangeField.Label>
          <DateRangeField.Field />
        </DateRangeField>
      </Section>
    </ScrollView>
  )
}

function Read({ label, value }: { label: string; value: Date | null }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {label} : {value === null ? 'null' : value.toISOString().slice(0, 10)}
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
