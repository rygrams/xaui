import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Slider } from '@xaui/native/slider'
import type { SliderSize } from '@xaui/native/slider'
import { useXAUITheme } from '@xaui/native/theme'

const SIZES: SliderSize[] = ['sm', 'md', 'lg']

/**
 * The verification screen for the `Slider`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it, only one for the value
 * arithmetic.
 *
 * What each section checks is in its subtitle: the thumb tracks the finger, a press
 * anywhere on the track moves it, the steps land where they should, and the two callbacks
 * fire at different times.
 */
export default function SliderScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="Drag it, or press anywhere on the track"
        note="A press on the track moves the thumb there, which is the half of a slider people forget: dragging a narrow thumb is a fine gesture on a mouse and a poor one on a finger. The thumb grows 15% under the press rather than moving — the finger is already covering it, so the scale is what you see in the gap around it."
      >
        <Basic />
      </Section>

      <Section
        title="Two callbacks, at different times"
        note="onValueChange fires on every step the thumb crosses, mid-drag included. onValueCommit fires once, when the finger lifts. The first is what a live preview reads; the second is where a network call belongs, because the first can fire fifty times in a second."
      >
        <Callbacks />
      </Section>

      <Section
        title="Steps"
        note="A step of 10 has eleven stops. A step of 0 is continuous. The snap counts steps from the minimum rather than rounding the value, so a range from 5 in steps of 10 stops at 5, 15, 25 — and not at 10, 20, 30."
      >
        <Stepped step={10} label="pas de 10" />
        <Stepped step={0} label="continu" />
        <Stepped step={10} min={5} max={95} label="de 5 à 95, pas de 10" />
      </Section>

      <Section
        title="Sizes"
        note="size moves the track's thickness, the thumb's width and the output's type. The thumb is wider than the track is tall at every size — HeroUI's capsule rather than a circle, which is what gives a finger something to hold."
      >
        {SIZES.map(size => (
          <Basic key={size} size={size} />
        ))}
      </Section>

      <Section
        title="The output formats itself"
        note="Slider.Output takes a function of the value, which is how a raw number becomes a percentage or a duration. A format prop would have been the same thing with less room in it."
      >
        <Formatted />
      </Section>

      <Section
        title="A tint (R7), and disabled"
        note="color is a raw value, never a token. It paints the fill and the thumb's capsule; the knob inside stays the tint's foreground, and the track keeps the theme's neutral — tinting the track too would leave the fill nothing to stand out against."
      >
        <Basic color="#7c3aed" />
        <Basic isDisabled />
      </Section>
    </ScrollView>
  )
}

function Basic({
  size,
  color,
  isDisabled,
}: {
  size?: SliderSize
  color?: string
  isDisabled?: boolean
}) {
  return (
    <Slider defaultValue={40} size={size} color={color} isDisabled={isDisabled}>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  )
}

function Stepped({
  step,
  min,
  max,
  label,
}: {
  step: number
  min?: number
  max?: number
  label: string
}) {
  return (
    <Slider defaultValue={min ?? 0} step={step} min={min} max={max}>
      <Slider.Output>{value => `${label} — ${value}`}</Slider.Output>
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  )
}

function Formatted() {
  return (
    <Slider defaultValue={75} max={180} step={5}>
      <Slider.Output>
        {value =>
          `${Math.floor(value / 60)} h ${String(value % 60).padStart(2, '0')}`
        }
      </Slider.Output>
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb accessibilityValueText={value => `${value} minutes`} />
      </Slider.Track>
    </Slider>
  )
}

function Callbacks() {
  const theme = useXAUITheme()
  const [live, setLive] = useState(40)
  const [committed, setCommitted] = useState(40)

  return (
    <View style={{ gap: 8 }}>
      <Slider defaultValue={40} onValueChange={setLive} onValueCommit={setCommitted}>
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
        {`onValueChange : ${live}`}
      </Text>
      <Text style={{ color: theme.colors.accent, fontSize: theme.fontSizes.sm }}>
        {`onValueCommit : ${committed}`}
      </Text>
    </View>
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
