import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DateRangePicker } from '@xaui/native/date-range-picker'
import { RangeCalendar } from '@xaui/native/range-calendar'
import type { DateRange } from '@xaui/native/range-calendar'
import { useXAUITheme } from '@xaui/native/theme'

const EMPTY: DateRange = { start: null, end: null }

/**
 * The verification screen for the `RangeCalendar` and the `DateRangePicker`. A component is
 * verified here and in the docs preview, in light and in dark — there is no test file.
 */
export default function DateRangePickerScreen() {
  const theme = useXAUITheme()
  const [stay, setStay] = useState<DateRange>(EMPTY)
  const [inline, setInline] = useState<DateRange>({
    start: new Date(2026, 8, 10),
    end: new Date(2026, 8, 14),
  })

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 220 }}
    >
      <Section
        title="Le mois, et la période dedans"
        note="Le RangeCalendar est un Calendar : la même racine, les mêmes variantes, le même état de mois, les mêmes bornes. L'en-tête, le titre, les deux flèches et les jours de semaine sont ses slots, réexportés et non enveloppés. Seule la cellule diffère, et seulement par la bande derrière elle — c'est possible parce que Calendar.Grid prend un enfant fonction."
      >
        <RangeCalendar
          value={inline}
          onValueChange={setInline}
          style={{ alignSelf: 'center' }}
        >
          <RangeCalendar.Header>
            <RangeCalendar.PreviousButton accessibilityLabel="Mois précédent" />
            <RangeCalendar.Title />
            <RangeCalendar.NextButton accessibilityLabel="Mois suivant" />
          </RangeCalendar.Header>
          <RangeCalendar.Weekdays />
          <RangeCalendar.Grid />
        </RangeCalendar>

        <Read range={inline} />
      </Section>

      <Section
        title="Trois pressions, pas deux"
        note="Appuyer sur un jour alors qu'une période est déjà choisie en commence une nouvelle : demander au lecteur d'effacer d'abord, c'est lui demander de trouver une commande qui ne devrait pas exister. Appuyer sur un jour avant le début en fait le nouveau début — une période à l'envers n'est pas une période, et échanger les deux en silence déplacerait une borne qu'il n'a pas touchée. Un séjour d'un jour est permis."
      >
        <DateRangePicker locale="fr-FR" value={stay} onValueChange={setStay}>
          <DateRangePicker.Trigger>
            <DateRangePicker.Value placeholder="Choisir un séjour" />
            <DateRangePicker.Indicator />
          </DateRangePicker.Trigger>
          <DateRangePicker.Sheet
            previousLabel="Mois précédent"
            nextLabel="Mois suivant"
          />
        </DateRangePicker>

        <Read range={stay} />
      </Section>

      <Section
        title="La première pression ne referme pas"
        note="Une période est deux décisions, et une feuille qui se fermait après la première ferait de la seconde une deuxième ouverture. Un début sans fin se lit tel quel dans le champ, pas « début – » : un tiret sans rien derrière dit que le champ est cassé, là où une date seule dit qu'il est à moitié répondu."
      >
        <DateRangePicker locale="en-US" calendarVariant="secondary">
          <DateRangePicker.Trigger>
            <DateRangePicker.Value placeholder="Pick a stay" />
            <DateRangePicker.Indicator />
          </DateRangePicker.Trigger>
          <DateRangePicker.Sheet
            previousLabel="Previous month"
            nextLabel="Next month"
          />
        </DateRangePicker>
      </Section>

      <Section
        title="Le champ est un déclencheur de Select"
        note="La variante habille le champ ; calendarVariant habille le mois. Un champ ghost au-dessus d'un mois primary est le cas ordinaire."
      >
        {(['primary', 'secondary', 'tertiary', 'ghost'] as const).map(variant => (
          <DateRangePicker key={variant} variant={variant} locale="fr-FR">
            <DateRangePicker.Trigger>
              <DateRangePicker.Value placeholder={variant} />
              <DateRangePicker.Indicator />
            </DateRangePicker.Trigger>
            <DateRangePicker.Sheet />
          </DateRangePicker>
        ))}

        <DateRangePicker isInvalid locale="fr-FR">
          <DateRangePicker.Trigger>
            <DateRangePicker.Value placeholder="Période requise" />
            <DateRangePicker.Indicator />
          </DateRangePicker.Trigger>
          <DateRangePicker.Sheet />
        </DateRangePicker>

        <DateRangePicker
          isDisabled
          locale="fr-FR"
          defaultValue={{ start: new Date(2026, 8, 10), end: new Date(2026, 8, 14) }}
        >
          <DateRangePicker.Trigger>
            <DateRangePicker.Value />
            <DateRangePicker.Indicator />
          </DateRangePicker.Trigger>
          <DateRangePicker.Sheet />
        </DateRangePicker>
      </Section>

      <Section
        title="Teinté, et borné"
        note="color va sur la bande et sur les deux bouts, par le même rôle. minValue et maxValue passent tels quels au calendrier."
      >
        <RangeCalendar
          color="#0ea5e9"
          size="sm"
          minValue={new Date(2026, 8, 5)}
          maxValue={new Date(2026, 8, 25)}
          defaultValue={{ start: new Date(2026, 8, 8), end: new Date(2026, 8, 19) }}
          style={{ alignSelf: 'center' }}
        >
          <RangeCalendar.Header>
            <RangeCalendar.PreviousButton accessibilityLabel="Mois précédent" />
            <RangeCalendar.Title />
            <RangeCalendar.NextButton accessibilityLabel="Mois suivant" />
          </RangeCalendar.Header>
          <RangeCalendar.Weekdays />
          <RangeCalendar.Grid />
        </RangeCalendar>
      </Section>
    </ScrollView>
  )
}

function Read({ range }: { range: DateRange }) {
  const theme = useXAUITheme()
  const at = (d: Date | null) => (d === null ? 'null' : d.toISOString().slice(0, 10))

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      début : {at(range.start)} — fin : {at(range.end)}
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
