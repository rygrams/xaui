import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Slider } from '@xaui/native/slider'
import type { SliderSize, SliderValue } from '@xaui/native/slider'
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
        note="A thin rail with a round knob riding on it, the legacy proportions rather than HeroUI's capsule: 6 to 10 points of rail under a 16 to 24 point disc. The knob overhangs the rail by half their difference on each side, and the rail reserves that overhang as a margin — otherwise the knob spills into whatever sits above and below. A press anywhere on the rail moves it there, and it grows 15% under the press rather than moving."
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
        note="size moves the rail's thickness, the knob's diameter and the output's type — 6/16, 8/20, 10/24. The knob is always wider than the rail is thick, which is what gives a finger something to hold. The three pairs are off the spacing grid on purpose: a rail is not a gap between two things, and rounding 6 to a spacing step would put the sizes on a scale that has no bearing on how thin a line can be and still be pressable."
      >
        {SIZES.map(size => (
          <Basic key={size} size={size} />
        ))}
      </Section>

      <Section
        title="A pair makes it a range"
        note="value={[20, 60]} is two thumbs and a fill between them, and it reports a pair back — the shape you wrote is the shape you get. Write one Slider.Thumb per end. The thumbs cannot cross: dragging the lower one past the upper stops it dead rather than swapping the two, because a swap loses the finger's grip and it ends up pushing the thumb it did not pick up. A press on the rail moves the nearest one."
      >
        <Ranged />
      </Section>

      <Section
        title="Vertical, counting from the bottom"
        note="orientation='vertical' turns the rail on its side. It counts from the floor up: a rail whose fill grew downwards would report a larger value the lower the knob sat, which is the opposite of what a vertical control means everywhere it appears. The rail runs 220 points unless you give it a height."
      >
        <View style={{ flexDirection: 'row', gap: 32 }}>
          <Vertical />
          <Vertical defaultValue={[20, 70]} />
        </View>
      </Section>

      <Section
        title="The output formats itself"
        note="Slider.Output takes a function of the value, which is how a raw number becomes a percentage or a duration. A format prop would have been the same thing with less room in it."
      >
        <Formatted />
      </Section>

      <Section
        title="A tint (R7), and disabled"
        note="Three steps of the same colour: the rail is the theme's neutral, the reach is the accent softened, the knob is the accent at full strength. The eye lands on the knob, which is the value, rather than on the bar behind it, which is only how far the value has come. color moves all three at once — resolveTint maps the soft step to a raw colour's soft slice for free. Disabled drops the colour entirely rather than dimming it: a pale lavender reads as an enabled slider seen through fog, a neutral one reads as switched off."
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

function Ranged() {
  return (
    <Slider defaultValue={[20, 60]}>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb index={0} />
        <Slider.Thumb index={1} />
      </Slider.Track>
    </Slider>
  )
}

function Vertical({
  defaultValue = 40,
}: {
  defaultValue?: number | [number, number]
}) {
  const isRange = Array.isArray(defaultValue)

  return (
    <Slider orientation="vertical" defaultValue={defaultValue}>
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb index={0} />
        {isRange ? <Slider.Thumb index={1} /> : null}
      </Slider.Track>
      <Slider.Output />
    </Slider>
  )
}

/** A range slider's output is a pair, so a formatter is written per end and joined. */
const asDuration = (value: number) =>
  `${Math.floor(value / 60)} h ${String(value % 60).padStart(2, '0')}`

function Formatted() {
  return (
    <Slider defaultValue={75} max={180} step={5}>
      <Slider.Output>
        {value =>
          typeof value === 'number'
            ? asDuration(value)
            : `${asDuration(value[0])} – ${asDuration(value[1])}`
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
  // `SliderValue`, not `number`: the callbacks report what the slider holds, and a
  // single-thumb slider is not a different component from a range one.
  const [live, setLive] = useState<SliderValue>(40)
  const [committed, setCommitted] = useState<SliderValue>(40)

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
