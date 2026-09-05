import { ScrollView, Text, View } from 'react-native'
import { Spinner } from '@xaui/native/spinner'
import type { SpinnerSize, SpinnerVariant } from '@xaui/native/spinner'
import { useXAUITheme } from '@xaui/native/theme'

const VARIANTS: SpinnerVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'success',
  'warning',
  'danger',
]

const SIZES: SpinnerSize[] = ['xs', 'sm', 'md', 'lg']

/**
 * The verification screen for the `Spinner`. A component is verified here and in the docs
 * preview, in light and in dark — there is no test file for it.
 *
 * What each section checks is in its subtitle: a variant names an ink rather than a fill,
 * the four sizes keep the stroke in proportion, the track is what makes the turn readable,
 * and `animation={false}` leaves the ring exactly where it was.
 */
export default function SpinnerScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 28, paddingBottom: 96 }}
    >
      <Section
        title="The seven inks"
        note="A spinner has no fill, so a variant names the colour of the thing itself: primary is accent, not accentForeground. No ghost — a spinner with no ink is not a spinner — and no soft slices, because a soft slice is a fill softened."
      >
        <Row>
          {VARIANTS.map(variant => (
            <Labelled key={variant} label={variant}>
              <Spinner variant={variant} />
            </Labelled>
          ))}
        </Row>
      </Section>

      <Section
        title="size — the diameter, and the only measurement a circle has"
        note="16, 20, 24, 32. The stroke thickens once, at lg: 2pt on a 32pt circle reads as a hairline, 3pt on a 16pt one reads as a doughnut. Check that all four turn at the same speed."
      >
        <Row>
          {SIZES.map(size => (
            <Labelled key={size} label={size}>
              <Spinner size={size} />
            </Labelled>
          ))}
        </Row>
      </Section>

      <Section
        title="The track — why it is two rings and not one"
        note="The faint full circle is the track; the arc turns over it. Without it a rotating three-quarter ring reads as broken rather than as busy. HeroUI gets the same figure from a gradient stroke, which would need react-native-svg — an optional peer a core component cannot require."
      >
        <Row>
          <Labelled label="lg · default">
            <Spinner size="lg" variant="default" />
          </Labelled>
          <Labelled label="lg · danger">
            <Spinner size="lg" variant="danger" />
          </Labelled>
        </Row>
      </Section>

      <Section
        title="color — one raw tint (R7)"
        note="The ring takes the tint and the track takes it at the same fraction, so a tinted spinner is the token one with a different ink. Hex only: the slices are derived in OKLab."
      >
        <Row>
          <Labelled label="#7c3aed">
            <Spinner color="#7c3aed" />
          </Labelled>
          <Labelled label="#0f766e">
            <Spinner color="#0f766e" />
          </Labelled>
          <Labelled label="secondary · #f59e0b">
            <Spinner variant="secondary" color="#f59e0b" />
          </Labelled>
        </Row>
      </Section>

      <Section
        title="animation={false} — the ring stays, nothing turns"
        note="No worklet is mounted at all: the branch renders a plain View, so a list frozen for a screenshot costs nothing. The size does not change, which is what stops a row from reflowing when the wait ends."
      >
        <Row>
          <Labelled label="on">
            <Spinner size="lg" />
          </Labelled>
          <Labelled label="off">
            <Spinner size="lg" animation={false} />
          </Labelled>
        </Row>
      </Section>

      <Section
        title="Beside a label, which is most of the time"
        note="The spinner hugs its own diameter, so a row lays it out like any other node. Nothing here needs a wrapper."
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Spinner size="xs" variant="tertiary" />
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.sm }}>
            Synchronisation…
          </Text>
        </View>
      </Section>

      <Section
        title="Style props — R14"
        note="Full React Native names and values, resolved after the recipe and before style. size stays the spinner's scale, so width is available and means what it says."
      >
        <Row>
          <Labelled label="marginTop={12}">
            <Spinner marginTop={12} />
          </Labelled>
          <Labelled label="opacity={0.4}">
            <Spinner opacity={0.4} />
          </Labelled>
          <Labelled label="style transform">
            <Spinner style={{ transform: [{ scale: 1.5 }] }} />
          </Labelled>
        </Row>
      </Section>
    </ScrollView>
  )
}

function Labelled({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const theme = useXAUITheme()

  return (
    <View style={{ alignItems: 'center', gap: 6, minWidth: 72 }}>
      {children}
      <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
        {label}
      </Text>
    </View>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {children}
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
