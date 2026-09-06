import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { AgendaCalendar } from '@xaui/native/agenda-calendar'
import type {
  AgendaCalendarSize,
  AgendaCalendarVariant,
} from '@xaui/native/agenda-calendar'
import { ChevronDownIcon, Icon } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: AgendaCalendarVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
]
const SIZES: AgendaCalendarSize[] = ['sm', 'md', 'lg']

/** A handful of days with something on them, around the day this was written. */
const EVENTS = [2, 4, 6, 7, 9, 10, 11, 12, 15, 16, 22].map(
  day => new Date(2026, 8, day)
)

/**
 * The verification screen for the `AgendaCalendar`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it, though the date
 * arithmetic under it is `utils/dates.ts` and that one is tested.
 *
 * Three things only this screen can show: that the marks sit under the numbers without
 * moving them, that Today goes dead once this week is on screen, and that the chosen day
 * wears the same disc it wears in a full `Calendar`.
 */
export default function AgendaCalendarScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 96 }}
    >
      <Week />

      <Section
        title="Today moves the strip. It does not choose today"
        note="The two are one press apart — today is right there once its week is on screen — and a button that quietly answered the question would be a button you cannot use to look. It goes dead while this week is already the one showing."
      >
        <AgendaCalendar defaultValue={new Date(2026, 8, 6)} events={EVENTS}>
          <Head />
          <AgendaCalendar.Weekdays />
          <AgendaCalendar.Week />
        </AgendaCalendar>
      </Section>

      <Section
        title="The four levels, and a tint"
        note="The cells resolve through calendarRecipe rather than a second table: a strip and a month showing two different discs for the same chosen day is what that sharing exists to prevent."
      >
        {VARIANTS.map(variant => (
          <View key={variant} style={{ gap: 6 }}>
            <AgendaCalendar
              variant={variant}
              size="sm"
              defaultValue={new Date(2026, 8, 6)}
              defaultWeek={new Date(2026, 8, 6)}
              events={EVENTS}
            >
              <Head />
              <AgendaCalendar.Weekdays />
              <AgendaCalendar.Week />
            </AgendaCalendar>
            <Caption>{variant}</Caption>
          </View>
        ))}
        <View style={{ gap: 6 }}>
          <AgendaCalendar
            color="#7c3aed"
            size="sm"
            defaultValue={new Date(2026, 8, 6)}
            defaultWeek={new Date(2026, 8, 6)}
            events={EVENTS}
          >
            <Head />
            <AgendaCalendar.Weekdays />
            <AgendaCalendar.Week />
          </AgendaCalendar>
          <Caption>color=#7c3aed — the disc, the mark on it, and the pill</Caption>
        </View>
      </Section>

      <Section
        title="size, bounds and isDisabled"
        note="The chevrons go dead when the week they would reach has no selectable day in it — the Calendar's rule, one unit down."
      >
        {SIZES.map(size => (
          <View key={size} style={{ gap: 6 }}>
            <AgendaCalendar
              size={size}
              defaultValue={new Date(2026, 8, 9)}
              defaultWeek={new Date(2026, 8, 9)}
              events={EVENTS}
            >
              <Head />
              <AgendaCalendar.Weekdays />
              <AgendaCalendar.Week />
            </AgendaCalendar>
            <Caption>{size}</Caption>
          </View>
        ))}
        <View style={{ gap: 6 }}>
          <AgendaCalendar
            size="sm"
            defaultValue={new Date(2026, 8, 9)}
            defaultWeek={new Date(2026, 8, 9)}
            minValue={new Date(2026, 8, 7)}
            maxValue={new Date(2026, 8, 11)}
            events={EVENTS}
          >
            <Head />
            <AgendaCalendar.Weekdays />
            <AgendaCalendar.Week />
          </AgendaCalendar>
          <Caption>Bounded to 7–11 September — both chevrons are dead</Caption>
        </View>
        <View style={{ gap: 6 }}>
          <AgendaCalendar
            size="sm"
            isDisabled
            defaultValue={new Date(2026, 8, 9)}
            defaultWeek={new Date(2026, 8, 9)}
            events={EVENTS}
          >
            <Head />
            <AgendaCalendar.Weekdays />
            <AgendaCalendar.Week />
          </AgendaCalendar>
          <Caption>isDisabled</Caption>
        </View>
      </Section>

      <Section
        title="Cells of your own"
        note="AgendaCalendar.Week takes a function, like Calendar.Grid and for the same reason: seven cells are generated from a date rather than written."
      >
        <AgendaCalendar
          size="sm"
          defaultValue={new Date(2026, 8, 6)}
          defaultWeek={new Date(2026, 8, 6)}
          events={EVENTS}
        >
          <Head />
          <AgendaCalendar.Weekdays />
          <AgendaCalendar.Week>
            {date => (
              <AgendaCalendar.Day key={date.getTime()} date={date}>
                <Text
                  style={{
                    color: isWeekend(date)
                      ? theme.colors.danger
                      : theme.colors.foreground,
                    fontSize: theme.fontSizes.sm,
                    fontWeight: theme.fontWeights.medium,
                  }}
                >
                  {date.getDate()}
                </Text>
              </AgendaCalendar.Day>
            )}
          </AgendaCalendar.Week>
        </AgendaCalendar>
      </Section>
    </ScrollView>
  )
}

/** The one the screenshot is of, and the one that shows the week and the day are two. */
function Week() {
  const [day, setDay] = useState<Date | undefined>(new Date(2026, 8, 6))

  return (
    <Section
      title="One week, and what is on it"
      note="A strip of seven numbers is a date picker; a strip with marks under some of them is an agenda. Page weeks with the chevrons: the line below does not move until you press a day."
    >
      <AgendaCalendar value={day} onValueChange={setDay} events={EVENTS}>
        <Head />
        <AgendaCalendar.Weekdays />
        <AgendaCalendar.Week />
      </AgendaCalendar>
      <Caption>
        {day === undefined ? 'value: —' : `value: ${day.toISOString().slice(0, 10)}`}
      </Caption>
    </Section>
  )
}

/**
 * The header every strip on this screen wears — and the chevron beside the month, which is
 * the caller's pressable rather than a slot: what it opens into is the caller's screen.
 */
function Head() {
  const theme = useXAUITheme()

  return (
    <AgendaCalendar.Header>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <AgendaCalendar.Title />
        <View style={{ transform: [{ rotate: '-90deg' }] }}>
          <Icon as={ChevronDownIcon} size={16} color={theme.colors.accent} />
        </View>
      </View>
      <AgendaCalendar.Nav>
        <AgendaCalendar.PreviousButton accessibilityLabel="Semaine précédente" />
        <AgendaCalendar.TodayButton>Today</AgendaCalendar.TodayButton>
        <AgendaCalendar.NextButton accessibilityLabel="Semaine suivante" />
      </AgendaCalendar.Nav>
    </AgendaCalendar.Header>
  )
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6
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
