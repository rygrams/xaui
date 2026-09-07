import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { WheelPicker } from '@xaui/native/wheel-picker'
import type { WheelPickerSize, WheelPickerVariant } from '@xaui/native/wheel-picker'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: WheelPickerVariant[] = ['primary', 'secondary', 'tertiary', 'ghost']
const SIZES: WheelPickerSize[] = ['sm', 'md', 'lg']

const HOURS = range(0, 23).map(pad)
const MINUTES = range(0, 59).map(pad)
const MERIDIEM = ['AM', 'PM']
const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

/**
 * The verification screen for the `WheelPicker`. A component is verified here and in the
 * docs preview, in light and in dark — there is no test file for it.
 *
 * Three things only this screen can show: that the rows fade and lean away from the middle
 * as the drum turns, that the column snaps to a row rather than stopping between two, and
 * that it reports **once**, at rest, rather than for every row a flick passes.
 */
export default function WheelPickerScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 96 }}
    >
      <Time />

      <Section
        title="Three columns — a date, and what P5.25c is made of"
        note="The thing that has a value is the column, not the wheel: a time is two columns and a date is three. The band is the root's, one shape across all of them — a band per column would show the seam wherever two columns sit at different widths."
      >
        <Date />
      </Section>

      <Section
        title="The four levels — and what the variant names is the band"
        note="ghost names neither a fill nor a border, and that is the design: a wheel whose rows fade and lean away already says which one is chosen, and on a busy screen the band is the part that reads as chrome."
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {VARIANTS.map(variant => (
            <View key={variant} style={{ flex: 1, gap: 8 }}>
              <WheelPicker variant={variant} visibleCount={3}>
                <WheelPicker.Column defaultValue="03">
                  {HOURS.slice(0, 8).map(hour => (
                    <WheelPicker.Item key={hour} value={hour}>
                      {hour}
                    </WheelPicker.Item>
                  ))}
                </WheelPicker.Column>
              </WheelPicker>
              <Caption>{variant}</Caption>
            </View>
          ))}
        </View>
      </Section>

      <Section
        title="size, visibleCount, color and isDisabled"
        note="visibleCount is forced odd — the whole control is built on there being a middle row, and an even count has two rows equally near the centre with the band over the seam between them. Ask for four and you get five."
      >
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {SIZES.map(size => (
            <View key={size} style={{ flex: 1, gap: 8 }}>
              <WheelPicker size={size} visibleCount={3}>
                <WheelPicker.Column defaultValue="05">
                  {HOURS.slice(0, 12).map(hour => (
                    <WheelPicker.Item key={hour} value={hour}>
                      {hour}
                    </WheelPicker.Item>
                  ))}
                </WheelPicker.Column>
              </WheelPicker>
              <Caption>{size}</Caption>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1, gap: 8 }}>
            <WheelPicker visibleCount={4} color="#7c3aed">
              <WheelPicker.Column defaultValue="07">
                {HOURS.slice(0, 12).map(hour => (
                  <WheelPicker.Item key={hour} value={hour}>
                    {hour}
                  </WheelPicker.Item>
                ))}
              </WheelPicker.Column>
            </WheelPicker>
            <Caption>visibleCount=4 → 5, color</Caption>
          </View>
          <View style={{ flex: 1, gap: 8 }}>
            <WheelPicker isDisabled visibleCount={5}>
              <WheelPicker.Column defaultValue="07">
                {HOURS.slice(0, 12).map(hour => (
                  <WheelPicker.Item key={hour} value={hour}>
                    {hour}
                  </WheelPicker.Item>
                ))}
              </WheelPicker.Column>
            </WheelPicker>
            <Caption>isDisabled</Caption>
          </View>
        </View>
      </Section>
    </ScrollView>
  )
}

/** The case the component exists for, and the one that shows it reports at rest. */
function Time() {
  const [hour, setHour] = useState('09')
  const [minute, setMinute] = useState('30')
  const [meridiem, setMeridiem] = useState('AM')

  return (
    <Section
      title="A column reports when it stops, never while it turns"
      note="One flick passes nine rows, and every one of them is a value some caller would have written to a form. Flick it: the line below changes once."
    >
      <WheelPicker>
        <WheelPicker.Column
          value={hour}
          onValueChange={setHour}
          accessibilityLabel="Heures"
        >
          {HOURS.map(value => (
            <WheelPicker.Item key={value} value={value}>
              {value}
            </WheelPicker.Item>
          ))}
        </WheelPicker.Column>
        <WheelPicker.Column
          value={minute}
          onValueChange={setMinute}
          accessibilityLabel="Minutes"
        >
          {MINUTES.map(value => (
            <WheelPicker.Item key={value} value={value}>
              {value}
            </WheelPicker.Item>
          ))}
        </WheelPicker.Column>
        <WheelPicker.Column
          value={meridiem}
          onValueChange={setMeridiem}
          accessibilityLabel="Matin ou après-midi"
        >
          {MERIDIEM.map(value => (
            <WheelPicker.Item key={value} value={value}>
              {value}
            </WheelPicker.Item>
          ))}
        </WheelPicker.Column>
      </WheelPicker>
      <Caption>{`${hour}:${minute} ${meridiem}`}</Caption>
    </Section>
  )
}

/** Three columns over one date, and the day count that shrinks under the month. */
function Date() {
  const [day, setDay] = useState('01')
  const [month, setMonth] = useState('janvier')
  const [year, setYear] = useState('2026')

  const days = range(1, daysIn(month)).map(pad)

  return (
    <View style={{ gap: 8 }}>
      <WheelPicker variant="primary">
        <WheelPicker.Column value={day} onValueChange={setDay}>
          {days.map(value => (
            <WheelPicker.Item key={value} value={value}>
              {value}
            </WheelPicker.Item>
          ))}
        </WheelPicker.Column>
        <WheelPicker.Column value={month} onValueChange={setMonth}>
          {MONTHS.map(value => (
            <WheelPicker.Item key={value} value={value}>
              {value}
            </WheelPicker.Item>
          ))}
        </WheelPicker.Column>
        <WheelPicker.Column value={year} onValueChange={setYear}>
          {range(2024, 2030).map(value => (
            <WheelPicker.Item key={value} value={String(value)}>
              {value}
            </WheelPicker.Item>
          ))}
        </WheelPicker.Column>
      </WheelPicker>
      <Caption>{`${day} ${month} ${year} — février n’a que 29 jours ici`}</Caption>
    </View>
  )
}

function daysIn(month: string): number {
  if (month === 'février') return 29
  return ['avril', 'juin', 'septembre', 'novembre'].includes(month) ? 30 : 31
}

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, index) => from + index)
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function Caption({ children }: { children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <Text
      style={{
        color: theme.colors.muted,
        fontSize: theme.fontSizes.xs,
        textAlign: 'center',
      }}
    >
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
