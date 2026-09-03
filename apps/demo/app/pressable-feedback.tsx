import { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { PressableFeedback } from '@xaui/native/system'
import type { AnimationProp, FeedbackVariant } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'

/**
 * The verification screen for `PressableFeedback`. It is controlled, so each tile owns its
 * press state exactly the way a component root does.
 *
 * No tile changes its own colour under the finger. That is the rule the primitive
 * documents — a recipe's `pressed` state *or* an overlay, never both — and a screen that
 * broke it made the overlays unreadable, which is precisely what this one used to do.
 */
export default function PressableFeedbackScreen() {
  const theme = useXAUITheme()

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 16, gap: 24, paddingBottom: 48 }}
    >
      <Section title="variant — the name is read, not matched">
        <Tile variant="scale" label="scale" />
        <Tile variant="highlight" label="highlight — a wash, no scale" />
        <Tile variant="ripple" label="ripple — a wave, no scale" />
        <Tile variant="scale-highlight" label="scale-highlight" />
        <Tile variant="scale-ripple" label="scale-ripple" />
        <Tile variant="none" label="none" />
      </Section>

      <Section title="The ink is resolved, not configured">
        <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
          Each tile reads its own background and takes the contrasting side. Press
          the label as well as the padding — the root is the touch surface, so both
          work.
        </Text>
        <Tile variant="ripple" label="on accent" surface={theme.colors.accent} />
        <Tile variant="ripple" label="on success" surface={theme.colors.success} />
        <Tile variant="ripple" label="on a surface" surface={theme.colors.surface} />
        <Tile
          variant="ripple"
          label="on danger-soft"
          surface={theme.colors.dangerSoft}
        />
      </Section>

      <Section title="animation — off mounts no worklet">
        <Tile variant="scale-ripple" animation={false} label="animation={false}" />
        <Tile variant="scale-highlight" animation="disabled" label="'disabled'" />
        <Tile
          variant="scale-ripple"
          animation={{ scale: false }}
          label="{ scale: false } — the wave alone"
        />
        <Tile
          variant="scale-ripple"
          animation={{ ripple: false }}
          label="{ ripple: false } — the scale alone"
        />
      </Section>

      <Section title="animation='disable-all' — inherited by descendants">
        <View
          style={{
            gap: 12,
            padding: 12,
            borderRadius: theme.radius.md,
            borderWidth: theme.borderWidth.default,
            borderColor: theme.colors.border,
          }}
        >
          <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
            Both tiles below ask for animations. Neither should move.
          </Text>
          <PressableFeedback animation="disable-all" variant="none">
            <View style={{ gap: 12 }}>
              <Tile
                variant="scale-highlight"
                label="nested, asks for scale-highlight"
              />
              <Tile variant="scale-ripple" label="nested, asks for scale-ripple" />
            </View>
          </PressableFeedback>
        </View>
      </Section>

      <Section title="asChild — the feedback goes through, not around">
        <AsChildTile />
      </Section>
    </ScrollView>
  )
}

function Tile({
  variant,
  animation,
  label,
  surface,
}: {
  variant: FeedbackVariant
  animation?: AnimationProp
  label: string
  surface?: string
}) {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)
  const background = surface ?? theme.colors.accent

  return (
    <PressableFeedback
      isPressed={isPressed}
      variant={variant}
      animation={animation}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      style={{
        height: theme.controlHeights.lg,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(4),
        borderRadius: theme.radius.md,
        backgroundColor: background,
      }}
    >
      <Text style={{ color: labelOn(theme, background) }}>{label}</Text>
    </PressableFeedback>
  )
}

/**
 * The case that would break silently if `asChild` went around `PressableFeedback` instead
 * of through it: the child must move under the finger exactly like a plain tile.
 */
function AsChildTile() {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      asChild
      isPressed={isPressed}
      variant="scale"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Pressable
        accessibilityRole="button"
        style={{
          height: theme.controlHeights.lg,
          justifyContent: 'center',
          paddingHorizontal: theme.spacing(4),
          borderRadius: theme.radius.md,
          backgroundColor: theme.colors.accent,
        }}
      >
        <Text style={{ color: theme.colors.accentForeground }}>
          a bare Pressable, wearing the feedback
        </Text>
      </Pressable>
    </PressableFeedback>
  )
}

/** Enough to keep the labels legible on the four surfaces this screen uses. */
function labelOn(
  theme: ReturnType<typeof useXAUITheme>,
  background: string
): string {
  if (background === theme.colors.success) return theme.colors.successForeground
  if (background === theme.colors.dangerSoft)
    return theme.colors.dangerSoftForeground
  if (background === theme.colors.surface) return theme.colors.surfaceForeground
  return theme.colors.accentForeground
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useXAUITheme()

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.semibold,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  )
}
