import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Calendar } from '@xaui/native/calendar'
import type { CalendarSize, CalendarVariant } from '@xaui/native/calendar'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: CalendarVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: CalendarSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `Calendar`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for the component, though the date
 * arithmetic under it is `utils/dates.ts` and that one is tested.
 *
 * Three things only this screen can show: that paging months does not change the chosen
 * day, that the grid stays six weeks tall from February to March, and that the chevrons go
 * dead at the bounds rather than staying lit and doing nothing.
 */
export default function CalendarScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 96 }}
    >
      <Picked />

      <Section
        title="The grid is always six weeks"
        note="Never five for a short month: a grid that changed height between March and April would move everything under it twice a year. Page from February to March and watch the bottom edge stay put."
      >
        <Frame>
          <Calendar defaultMonth={new Date(2026, 1, 1)}>
            <Header />
            <Calendar.Weekdays />
            <Calendar.Grid />
          </Calendar>
        </Frame>
      </Section>

      <Section
        title="minValue and maxValue — and the chevrons go dead"
        note="A step that would land on a month with no selectable day has nothing to show. Days outside the bounds are muted and inert; days outside the month are muted and still choosable, because a calendar that refused the 1st of next month would be refusing a date you can see."
      >
        <Frame>
          <Calendar
            defaultMonth={new Date(2026, 8, 1)}
            minValue={new Date(2026, 8, 3)}
            maxValue={new Date(2026, 9, 20)}
          >
            <Header />
            <Calendar.Weekdays />
            <Calendar.Grid />
          </Calendar>
        </Frame>
      </Section>

      <Section
        title="The four levels, a tint, and firstDayOfWeek"
        note="What the variant names is the chosen day. The week starts where the locale says — Intl answers it where it exists — and firstDayOfWeek overrides it outright."
      >
        {VARIANTS.map(variant => (
          <Frame key={variant}>
            <Calendar
              variant={variant}
              size="sm"
              defaultValue={new Date(2026, 8, 6)}
              defaultMonth={new Date(2026, 8, 1)}
            >
              <Header caption={variant} />
              <Calendar.Weekdays />
              <Calendar.Grid />
            </Calendar>
          </Frame>
        ))}
        <Frame>
          <Calendar
            color="#7c3aed"
            size="sm"
            locale="fr-FR"
            defaultValue={new Date(2026, 8, 6)}
            defaultMonth={new Date(2026, 8, 1)}
          >
            <Header caption="color, fr-FR — la semaine commence lundi" />
            <Calendar.Weekdays />
            <Calendar.Grid />
          </Calendar>
        </Frame>
      </Section>

      <Section
        title="size, radius and isDisabled"
        note="size is the cell's box and its type, never the grid's width: a calendar is seven columns wide whatever the size, so the grid spans its parent instead."
      >
        {SIZES.map(size => (
          <Frame key={size}>
            <Calendar
              size={size}
              defaultValue={new Date(2026, 8, 15)}
              defaultMonth={new Date(2026, 8, 1)}
            >
              <Header caption={size} />
              <Calendar.Weekdays />
              <Calendar.Grid />
            </Calendar>
          </Frame>
        ))}
        <Frame>
          <Calendar
            size="sm"
            radius="md"
            defaultValue={new Date(2026, 8, 15)}
            defaultMonth={new Date(2026, 8, 1)}
          >
            <Header caption='radius="md"' />
            <Calendar.Weekdays />
            <Calendar.Grid />
          </Calendar>
        </Frame>
        <Frame>
          <Calendar
            size="sm"
            isDisabled
            defaultValue={new Date(2026, 8, 15)}
            defaultMonth={new Date(2026, 8, 1)}
          >
            <Header caption="isDisabled" />
            <Calendar.Weekdays />
            <Calendar.Grid />
          </Calendar>
        </Frame>
      </Section>

      <Section
        title="Cells of your own"
        note="Calendar.Grid takes a function, and it is the one place in the library that does: forty-two cells are generated from a month rather than written, so there is nothing to compose against. A day is a date plus the calendar around it — everything else it reads for itself."
      >
        <Frame>
          <Calendar
            size="sm"
            defaultValue={new Date(2026, 8, 6)}
            defaultMonth={new Date(2026, 8, 1)}
          >
            <Header caption="Weekends written in danger" />
            <Calendar.Weekdays />
            <Calendar.Grid>
              {date => (
                <Calendar.Day key={date.getTime()} date={date}>
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
                </Calendar.Day>
              )}
            </Calendar.Grid>
          </Calendar>
        </Frame>
      </Section>
    </ScrollView>
  )
}

/** The section that shows the month and the value are two pieces of state. */
function Picked() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 6))

  return (
    <Section
      title="Paging months does not choose a day"
      note="The month on screen is state of its own. Page forward and back: the line below does not move until you press a day."
    >
      <Frame>
        <Calendar value={date} onValueChange={setDate}>
          <Header />
          <Calendar.Weekdays />
          <Calendar.Grid />
        </Calendar>
      </Frame>
      <Caption>
        {date === undefined
          ? 'value: —'
          : `value: ${date.toISOString().slice(0, 10)}`}
      </Caption>
    </Section>
  )
}

/** The header every calendar on this screen wears, plus a line saying which one it is. */
function Header({ caption }: { caption?: string }) {
  return (
    <>
      <Calendar.Header>
        <Calendar.PreviousButton accessibilityLabel="Mois précédent" />
        <Calendar.Title />
        <Calendar.NextButton accessibilityLabel="Mois suivant" />
      </Calendar.Header>
      {caption === undefined ? null : <Caption>{caption}</Caption>}
    </>
  )
}

function isWeekend(date: Date): boolean {
  return date.getDay() === 0 || date.getDay() === 6
}

/** A surface to read the calendar against, since the calendar draws no ground of its own. */
function Frame({ children }: { children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.xl,
        padding: 12,
        gap: 8,
      }}
    >
      {children}
    </View>
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
