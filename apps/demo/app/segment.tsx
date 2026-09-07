import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Segment } from '@xaui/native/segment'
import type { SegmentSize } from '@xaui/native/segment'
import { useXAUITheme } from '@xaui/native/theme'

const SIZES: SegmentSize[] = ['sm', 'md', 'lg']

const VIEWS = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'analytics', label: 'Analytics' },
]

const RANGES = [
  { value: 'day', label: 'Jour' },
  { value: 'week', label: 'Semaine' },
  { value: 'month', label: 'Mois' },
]

/**
 * The verification screen for the `Segment`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 */
export default function SegmentScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 32, paddingBottom: 96 }}
    >
      <Section
        title="A filter, not a tab bar"
        note="Same clothes, different job. A tab bar wraps content — its triggers name panels that live under it — and says tablist out loud. A segment names nothing: it holds a value the way a radio group does, and says radiogroup. The pill is not a slot here, because a segment without one is not a segment."
      >
        <Filter options={VIEWS} initial="dashboard" />
      </Section>

      <Section
        title="Separators, for a list long enough to need dividing"
        note="hasSeparator draws a hairline between the options the pill is nowhere near. Both edges of the pill stay clear — a rule running into a raised surface reads as a crack in it, which is what iOS has done since the segmented control existed and why one does not look like a table."
      >
        <Filter options={RANGES} initial="week" hasSeparator />
        <Filter options={RANGES} initial="day" hasSeparator />
      </Section>

      <Section
        title="Sizes"
        note="size moves the option's padding, its gap and the type. The track's three-point inset does not scale: it is the gap between the pill and the track's edge, and at half a spacing step it would be two points and the pill would touch."
      >
        {SIZES.map(size => (
          <Filter key={size} options={VIEWS} initial="dashboard" size={size} />
        ))}
      </Section>

      <Section
        title="It hugs its options"
        note="A segment as wide as the screen with two options in it is a navigation bar pretending to be a filter. Reach for style if a row has to fill its parent — there is no fullWidth prop here, as there is nowhere else in the library."
      >
        <Filter options={RANGES} initial="month" />
      </Section>

      <Section
        title="A tint, and disabled"
        note="color is a raw value, never a token. It moves the pill and the word on it, because fgSelected is a role rather than a token named in a state — so the tint reaches the label as well as the shape under it."
      >
        <Filter options={VIEWS} initial="analytics" color="#15803d" />
        <Filter options={VIEWS} initial="dashboard" isDisabled />
      </Section>
    </ScrollView>
  )
}

function Filter({
  options,
  initial,
  size,
  color,
  hasSeparator,
  isDisabled,
}: {
  options: ReadonlyArray<{ value: string; label: string }>
  initial: string
  size?: SegmentSize
  color?: string
  hasSeparator?: boolean
  isDisabled?: boolean
}) {
  const [value, setValue] = useState(initial)

  return (
    <Segment
      value={value}
      onValueChange={setValue}
      size={size}
      color={color}
      hasSeparator={hasSeparator}
      isDisabled={isDisabled}
    >
      {options.map(option => (
        <Segment.Item key={option.value} value={option.value}>
          {option.label}
        </Segment.Item>
      ))}
    </Segment>
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
