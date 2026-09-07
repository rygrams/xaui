import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ProgressCircle } from '@xaui/native/progress-circle'
import type {
  ProgressCircleSize,
  ProgressCircleVariant,
} from '@xaui/native/progress-circle'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: ProgressCircleVariant[] = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
]
const SIZES: ProgressCircleSize[] = ['sm', 'md', 'lg']

/** The ring's diameter at each step, for the caption under it. */
const DIAMETERS: Record<ProgressCircleSize, number> = { sm: 32, md: 48, lg: 64 }

/**
 * The verification screen for the `ProgressCircle`. A component is verified here and in
 * the docs preview, in light and in dark — there is no test file for it.
 *
 * Two things only this screen can show: the arc sweeps to each new value rather than
 * jumping, and it starts at twelve o'clock with a rounded cap at both ends.
 */
export default function ProgressCircleScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Moving />

      <Section
        title="The ring alone, and the ring with its number"
        note="Written with no children it is the ring, which is the form a row wants. Value is positioned absolutely so it centres on the ring rather than pushing it."
      >
        <Row>
          <ProgressCircle value={72} />
          <ProgressCircle value={72}>
            <ProgressCircle.Indicator />
            <ProgressCircle.Value />
          </ProgressCircle>
          <ProgressCircle value={100} variant="success">
            <ProgressCircle.Indicator />
            <ProgressCircle.Value>✓</ProgressCircle.Value>
          </ProgressCircle>
        </Row>
      </Section>

      <Section
        title="size — the diameter, the stroke and the type inside"
        note="Bigger than the Spinner's ladder at every step, because a spinner says wait and this says how long — which usually means a number in the middle of it. sm is the step where one does not fit."
      >
        <Row>
          {SIZES.map(size => (
            <View key={size} style={{ alignItems: 'center', gap: 8 }}>
              <ProgressCircle size={size} value={64}>
                <ProgressCircle.Indicator />
                {/* Not at `sm`: 32 points across, less two strokes, is narrower than
                    "64 %" is wide. That step is the ring on its own. */}
                {size === 'sm' ? null : <ProgressCircle.Value />}
              </ProgressCircle>
              <Caption>{`${size} · ${DIAMETERS[size]}pt`}</Caption>
            </View>
          ))}
        </Row>
      </Section>

      <Section
        title="radius — a number, and the one place the word is geometry"
        note="A circle has no corner to round. It is raw, so it lives outside the style cache and wins over size — for a ring that has to line up with something already on the screen."
      >
        <Row>
          {[12, 20, 28, 40].map(radius => (
            <View key={radius} style={{ alignItems: 'center', gap: 8 }}>
              <ProgressCircle radius={radius} value={64} />
              <Caption>{`radius=${radius}`}</Caption>
            </View>
          ))}
        </Row>
      </Section>

      <Section
        title="strokeWidth — and it is clamped at half the ring"
        note="A stroke thicker than the ring is wide draws a path with a negative radius, which renders nothing on one platform with no error anywhere. The last one asked for 60."
      >
        <Row>
          {[2, 6, 12, 60].map(stroke => (
            <View key={stroke} style={{ alignItems: 'center', gap: 8 }}>
              <ProgressCircle strokeWidth={stroke} value={64} />
              <Caption>{`strokeWidth=${stroke}`}</Caption>
            </View>
          ))}
        </Row>
      </Section>

      <Section
        title="The five variants, a tint, and isDisabled"
        note="The ProgressBar's table unchanged: one neutral ring, five arcs on it, and color lands on the arc through the same role."
      >
        <Row>
          {VARIANTS.map((variant, index) => (
            <ProgressCircle key={variant} variant={variant} value={30 + index * 15}>
              <ProgressCircle.Indicator />
              <ProgressCircle.Value />
            </ProgressCircle>
          ))}
        </Row>
        <Row>
          <ProgressCircle color="#7c3aed" value={70} />
          <ProgressCircle color="#0f766e" value={45} />
          <ProgressCircle isDisabled value={45} />
          <ProgressCircle value={0} />
        </Row>
      </Section>
    </ScrollView>
  )
}

/** The section a screenshot cannot check: the arc has to sweep, not jump. */
function Moving() {
  const [value, setValue] = useState(15)

  useEffect(() => {
    const timer = setInterval(
      () => setValue(next => (next >= 100 ? 0 : next + 17)),
      1200
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <Section
      title="The arc sweeps to its new value"
      note="It is a dash offset on one path rather than a shape rebuilt per value, which is what keeps one rounded cap at each end while it moves. The second one has animation={false}."
    >
      <Row>
        <ProgressCircle size="lg" value={value}>
          <ProgressCircle.Indicator />
          <ProgressCircle.Value />
        </ProgressCircle>
        <ProgressCircle size="lg" value={value} variant="success">
          <ProgressCircle.Indicator animation={false} />
          <ProgressCircle.Value />
        </ProgressCircle>
      </Row>
    </Section>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
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
