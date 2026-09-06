import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Calendar } from '@xaui/native/calendar'
import { DatePicker } from '@xaui/native/date-picker'
import type { DatePickerSize, DatePickerVariant } from '@xaui/native/date-picker'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: DatePickerVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: DatePickerSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `DatePicker`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it, though the date
 * arithmetic under it is `utils/dates.ts` and that one is tested.
 *
 * Three things only this screen can show: that the panel is as wide as the grid rather than
 * as wide as the field, that pressing a day both answers and closes, and that the field and
 * the grid never disagree about which day is chosen.
 */
export default function DatePickerScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 320 }}
    >
      <Picked />

      <Section
        title="The panel is as wide as the grid, not as wide as the field"
        note="A list is as wide as the field that opens it, because its rows are that field's answers. A month grid is seven columns of a fixed cell, and squeezing it into a narrow field would crush the cells or clip the week. Open the narrow one below."
      >
        <View style={{ width: 160 }}>
          <Field placeholder="Étroit" />
        </View>
      </Section>

      <Section
        title="The field's level is not the calendar's"
        note="A ghost field over a primary calendar is the ordinary case: the trigger is quiet on the form and the chosen day is not. variant dresses the field, calendarVariant dresses the grid."
      >
        {VARIANTS.map(variant => (
          <Field key={variant} variant={variant} placeholder={variant} />
        ))}
        <Field
          variant="ghost"
          calendarVariant="primary"
          placeholder="ghost field, primary calendar"
        />
      </Section>

      <Section
        title="size, bounds, formatOptions and the states"
        note="One set of bounds, not two: the field, the grid and the chevrons all read the same minValue and maxValue. formatOptions is how the field reads the day, and it never changes what the grid thinks is chosen."
      >
        {SIZES.map(size => (
          <Field key={size} size={size} placeholder={size} />
        ))}
        <Field
          placeholder="Les trente prochains jours"
          minValue={new Date(2026, 8, 6)}
          maxValue={new Date(2026, 9, 6)}
        />
        <Field
          defaultValue={new Date(2026, 8, 6)}
          formatOptions={{ dateStyle: 'full' }}
          placeholder="dateStyle: full"
        />
        <Field isInvalid placeholder="isInvalid" />
        <Field isDisabled placeholder="isDisabled" />
        <Field color="#7c3aed" placeholder="color — the field and the chosen day" />
      </Section>

      <Section
        title="closeOnSelect, and a calendar of your own"
        note="Off for a picker inside a form that confirms. DatePicker.Calendar takes children, so a Today button under the grid is the caller's — and it stays bound to the picker's value either way."
      >
        <Confirming />
      </Section>
    </ScrollView>
  )
}

/** The section that shows the field and the grid never disagree. */
function Picked() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Section
      title="A field that opens a month"
      note="Pressing a day answers and closes. The line below is the value the picker holds; the field above reads the same day through Intl."
    >
      <DatePicker value={date} onValueChange={setDate}>
        <DatePicker.Trigger>
          <DatePicker.Value placeholder="Choisir une date" />
          <DatePicker.Indicator />
        </DatePicker.Trigger>
        <DatePicker.Overlay />
        <DatePicker.Content>
          <DatePicker.Calendar />
        </DatePicker.Content>
      </DatePicker>
      <Caption>
        {date === undefined
          ? 'value: —'
          : `value: ${date.toISOString().slice(0, 10)}`}
      </Caption>
    </Section>
  )
}

/** A picker that does not close on a press, with the caller's own footer under the grid. */
function Confirming() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 6))
  const theme = useXAUITheme()

  return (
    <DatePicker value={date} onValueChange={setDate} closeOnSelect={false}>
      <DatePicker.Trigger>
        <DatePicker.Value placeholder="Reste ouvert" />
        <DatePicker.Indicator />
      </DatePicker.Trigger>
      <DatePicker.Overlay />
      <DatePicker.Content>
        <DatePicker.Calendar>
          <Calendar.Header>
            <Calendar.PreviousButton accessibilityLabel="Mois précédent" />
            <Calendar.Title />
            <Calendar.NextButton accessibilityLabel="Mois suivant" />
          </Calendar.Header>
          <Calendar.Weekdays />
          <Calendar.Grid />
          <Text
            style={{
              color: theme.colors.muted,
              fontSize: theme.fontSizes.xs,
              textAlign: 'center',
            }}
          >
            Appuyez ailleurs pour fermer
          </Text>
        </DatePicker.Calendar>
      </DatePicker.Content>
    </DatePicker>
  )
}

function Field({
  placeholder = 'Choisir une date',
  ...props
}: {
  placeholder?: string
  variant?: DatePickerVariant
  calendarVariant?: DatePickerVariant
  size?: DatePickerSize
  color?: string
  defaultValue?: Date
  minValue?: Date
  maxValue?: Date
  formatOptions?: Intl.DateTimeFormatOptions
  isInvalid?: boolean
  isDisabled?: boolean
}) {
  return (
    <DatePicker {...props}>
      <DatePicker.Trigger>
        <DatePicker.Value placeholder={placeholder} />
        <DatePicker.Indicator />
      </DatePicker.Trigger>
      <DatePicker.Overlay />
      <DatePicker.Content>
        <DatePicker.Calendar />
      </DatePicker.Content>
    </DatePicker>
  )
}

function Caption({ children }: { children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {children}
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
    <View style={{ gap: 14 }}>
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
