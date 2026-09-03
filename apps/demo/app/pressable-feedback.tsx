import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { PressableFeedback } from '@xaui/native/system'
import type { AnimationProp, FeedbackVariant } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for P1.3. `PressableFeedback` is controlled, so each tile owns
 * its press state exactly the way a component root will — which is also what makes the
 * pressed *colour* below a real stand-in for a recipe's `pressed` state.
 */
export default function PressableFeedbackScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 24, paddingBottom: 48 }}
    >
      <Section title="feedbackVariant — the four values">
        <Tile variant="scale-highlight" label="scale-highlight" />
        <Tile variant="scale-ripple" label="scale-ripple" />
        <Tile variant="scale" label="scale" />
        <Tile variant="none" label="none" />
      </Section>

      <Section title="animation — off mounts no worklet">
        <Tile
          variant="scale-highlight"
          animation={false}
          label="animation={false}"
        />
        <Tile variant="scale-highlight" animation="disabled" label="'disabled'" />
        <Tile
          variant="scale-highlight"
          animation={{ scale: false }}
          label="{ scale: false } — wash only"
        />
        <Tile
          variant="scale-ripple"
          animation={{ ripple: false }}
          label="{ ripple: false } — scale only"
        />
      </Section>

      <Section title="Ripple ink — the component gives it, the primitive cannot know">
        <ContrastRippleTile />
      </Section>

      <Section title="animation='disable-all' — inherited by descendants">
        <PressableFeedback
          animation="disable-all"
          feedbackVariant="none"
          style={{
            padding: 12,
            gap: 8,
            borderRadius: theme.radius.lg,
            borderWidth: theme.borderWidth.default,
            borderColor: theme.colors.border,
          }}
        >
          <Text style={{ color: theme.colors.foreground }}>
            Both tiles below ask for animations. Neither should move.
          </Text>
          <Tile variant="scale-highlight" label="nested, asks for scale-highlight" />
          <Tile variant="scale-ripple" label="nested, asks for scale-ripple" />
        </PressableFeedback>
      </Section>

      <Section title="A styled overlay — variant 'scale', slot rendered by hand">
        <StyledOverlayTile />
      </Section>

      <Section title="asChild — the feedback must survive the merge">
        <AsChildTile />
      </Section>

      <Section title="animation per slot — same variant, slower and stronger">
        <SlowHighlightTile />
      </Section>
    </ScrollView>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 8 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.sm,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}

function Tile({
  variant,
  animation,
  label,
}: {
  variant: FeedbackVariant
  animation?: AnimationProp
  label: string
}) {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      isPressed={isPressed}
      feedbackVariant={variant}
      animation={animation}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      style={{
        height: theme.controlHeights.lg,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(4),
        borderRadius: theme.radius.md,
        // Deliberately **not** swapping to `accentPressed` on press. These tiles exist to
        // show what the primitive does under the finger, and a fill that moves at the same
        // time competes with it — with `scale-ripple` the two cancel and the wave becomes
        // unreadable. A recipe's `pressed` state and an overlay are alternatives, never
        // both at once; that is the rule, and this screen has to obey it too.
        backgroundColor: theme.colors.accent,
      }}
    >
      <Text style={{ color: theme.colors.accentForeground }}>{label}</Text>
    </PressableFeedback>
  )
}

function StyledOverlayTile() {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      isPressed={isPressed}
      feedbackVariant="scale"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      style={{
        height: theme.controlHeights.lg,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(4),
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        backgroundColor: theme.colors.surface,
      }}
    >
      <PressableFeedback.Highlight
        style={{ backgroundColor: theme.colors.danger }}
      />
      <Text style={{ color: theme.colors.surfaceForeground }}>
        scale + a Highlight tinted by the slot&apos;s own style
      </Text>
    </PressableFeedback>
  )
}

/**
 * The case that would break silently if `asChild` went around `PressableFeedback`
 * instead of through it: the child must scale and wash exactly like a plain tile.
 */
function AsChildTile() {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      asChild
      isPressed={isPressed}
      feedbackVariant="scale-highlight"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
    >
      <View
        style={{
          height: theme.controlHeights.lg,
          justifyContent: 'center',
          paddingHorizontal: theme.spacing(4),
          borderRadius: theme.radius.md,
          overflow: 'hidden',
          backgroundColor: theme.colors.success,
        }}
      >
        <Text style={{ color: theme.colors.successForeground }}>
          asChild — merged into this View, feedback intact
        </Text>
      </View>
    </PressableFeedback>
  )
}

function SlowHighlightTile() {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      isPressed={isPressed}
      feedbackVariant="scale"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      style={{
        height: theme.controlHeights.lg,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(4),
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        backgroundColor: theme.colors.warning,
      }}
    >
      <PressableFeedback.Highlight animation={{ duration: 600, opacity: 0.35 }} />
      <Text style={{ color: theme.colors.warningForeground }}>
        Highlight with animation={'{'} duration: 600, opacity: 0.35 {'}'}
      </Text>
    </PressableFeedback>
  )
}

/**
 * The ripple's ink, given by the component rather than guessed by the primitive.
 *
 * `PressableFeedback` cannot know what it is sitting on, so its default ink is the theme's
 * `foreground`. A component knows its surface and can say otherwise: it picks
 * `feedbackVariant="scale"` and gives the wave its own colour.
 *
 * A *lighter* ink than the fill is the Material state-layer convention, and it is the wrong
 * call here — the tile's `accentPressed` already lightens on press, so a light wave on top
 * of it washes the control out. Darker ink, one direction of travel.
 */
function ContrastRippleTile() {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      isPressed={isPressed}
      feedbackVariant="scale"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      style={{
        height: theme.controlHeights.lg,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(4),
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        backgroundColor: theme.colors.accent,
      }}
    >
      <PressableFeedback.Ripple style={{ backgroundColor: theme.colors.eclipse }} />
      <Text style={{ color: theme.colors.accentForeground }}>
        Ripple in a darker ink than the default
      </Text>
    </PressableFeedback>
  )
}
