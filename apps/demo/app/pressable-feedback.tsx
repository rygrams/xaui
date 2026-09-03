import { useState } from 'react'
import type { ReactNode } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { PressableFeedback } from '@xaui/native/system'
import type { AnimationProp } from '@xaui/native/system'
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
      <Section title="The root scales — overlays are children">
        <Note>
          There is no prop naming what to mount. The scale is the root&apos;s own; a
          wash or a wave is something you render, in any order — the root paints its
          overlays under the content wherever they were written.
        </Note>
        <Tile label="scale alone — nothing rendered" />
        <Tile label="+ Highlight" overlay={<PressableFeedback.Highlight />} />
        <Tile label="+ Ripple" overlay={<PressableFeedback.Ripple />} />
        <Tile
          label="both — unreachable when this was an enum"
          // An array and not a fragment: `Children.toArray` flattens arrays, so these stay
          // direct children and get hoisted. A fragment would hide them from the root.
          overlay={[
            <PressableFeedback.Highlight key="wash" />,
            <PressableFeedback.Ripple key="wave" />,
          ]}
        />
        <Tile label="neither, and no scale" animation={false} />
        <Note>
          The tile below writes its wash <Bold>after</Bold> the label. It must look
          identical to the &ldquo;+ Highlight&rdquo; tile — if the wash ever greys
          out the text, the root stopped hoisting it.
        </Note>
        <Tile
          label="written last — still painted underneath"
          overlay={<PressableFeedback.Highlight />}
          overlayLast
        />
      </Section>

      <Section title="The ink and the corners are resolved, not configured">
        <Note>
          Each tile reads its own background and takes the contrasting side. Press
          the label as well as the padding — the root is the touch surface, so both
          work.
        </Note>
        <Tile
          label="on accent"
          surface={theme.colors.accent}
          overlay={<PressableFeedback.Ripple />}
        />
        <Tile
          label="on success"
          surface={theme.colors.success}
          overlay={<PressableFeedback.Ripple />}
        />
        <Tile
          label="on a surface"
          surface={theme.colors.surface}
          overlay={<PressableFeedback.Ripple />}
        />
        <Tile
          label="on danger-soft — rgba, so the foreground"
          surface={theme.colors.dangerSoft}
          overlay={<PressableFeedback.Ripple />}
        />
        <Note>
          The overlay carries the clip, and takes the root&apos;s corners with it.
          The wave below must stay inside the pill, and the root is free to let a
          child overflow.
        </Note>
        <Tile
          label="a pill — the wave stays inside"
          radius={999}
          overlay={<PressableFeedback.Ripple />}
        />
      </Section>

      <Section title="animation — off mounts no worklet">
        <Tile
          label="animation={false}"
          animation={false}
          overlay={<PressableFeedback.Ripple />}
        />
        <Tile
          label="'disabled'"
          animation="disabled"
          overlay={<PressableFeedback.Highlight />}
        />
        <Tile
          label="{ scale: false } — the wave alone"
          animation={{ scale: false }}
          overlay={<PressableFeedback.Ripple />}
        />
        <Tile
          label="{ ripple: false } — the scale alone"
          animation={{ ripple: false }}
          overlay={<PressableFeedback.Ripple />}
        />
        <Tile
          label="the slot's own animation wins"
          overlay={<PressableFeedback.Highlight animation={{ opacity: 0.45 }} />}
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
          <Note>Both tiles below ask for animations. Neither should move.</Note>
          <PressableFeedback animation="disable-all">
            <View style={{ gap: 12 }}>
              <Tile
                label="nested, asks for a highlight"
                overlay={<PressableFeedback.Highlight />}
              />
              <Tile
                label="nested, asks for a ripple"
                overlay={<PressableFeedback.Ripple />}
              />
            </View>
          </PressableFeedback>
        </View>
      </Section>

      <Section title="Wrapping — the same tree, said the other way">
        <Note>
          An overlay can take the content it sits under. It does <Bold>not</Bold> box
          it: the children come back as siblings in a fragment, so the row below
          keeps the root&apos;s flexDirection, gap and alignItems — the icon and the
          label are still direct children of the pressable.
        </Note>
        <WrappingTile />
      </Section>

      <Section title="asChild — the overlay is the caller's to place">
        <Note>
          The caller&apos;s element is itself the pressable, so there is no sibling
          for the primitive to inject. Composition is the only way an overlay can
          exist here — and the reason the context is published above the root.
        </Note>
        <AsChildTile />
      </Section>
    </ScrollView>
  )
}

function Tile({
  animation,
  label,
  surface,
  radius,
  overlay,
  overlayLast = false,
}: {
  animation?: AnimationProp
  label: string
  surface?: string
  radius?: number
  overlay?: ReactNode
  /** Writes the wave after the label, to prove the root hoists it back underneath. */
  overlayLast?: boolean
}) {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)
  const background = surface ?? theme.colors.accent

  return (
    <PressableFeedback
      isPressed={isPressed}
      animation={animation}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      style={{
        height: theme.controlHeights.lg,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing(4),
        borderRadius: radius ?? theme.radius.md,
        backgroundColor: background,
      }}
    >
      {overlayLast ? null : overlay}
      <Text style={{ color: labelOn(theme, background) }}>{label}</Text>
      {overlayLast ? overlay : null}
    </PressableFeedback>
  )
}

function Bold({ children }: { children: ReactNode }) {
  const theme = useXAUITheme()

  return <Text style={{ fontWeight: theme.fontWeights.semibold }}>{children}</Text>
}

/**
 * The wrapping form, on a row whose layout comes entirely from the root.
 *
 * This is the tile that proves the fragment claim: if `Ripple` boxed its children, the
 * `gap` and the `alignItems` below would apply to that box instead of to the two texts, and
 * the dot would collapse against the label. They must stay a spaced, centred row.
 */
function WrappingTile() {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      isPressed={isPressed}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      style={{
        height: theme.controlHeights.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing(3),
        paddingHorizontal: theme.spacing(4),
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.accent,
      }}
    >
      <PressableFeedback.Ripple>
        <Text style={{ color: theme.colors.accentForeground, fontSize: 20 }}>●</Text>
        <Text style={{ color: theme.colors.accentForeground }}>
          the gap and the centring still come from the root
        </Text>
      </PressableFeedback.Ripple>
    </PressableFeedback>
  )
}

/**
 * Two things at once, and both would break silently.
 *
 * The feedback must go *through* `PressableFeedback` rather than around it — the child
 * moves under the finger exactly like a plain tile. And the wash is rendered by the caller
 * among its own children, which is the only place it can go when the caller's element is
 * the pressable.
 */
function AsChildTile() {
  const theme = useXAUITheme()
  const [isPressed, setIsPressed] = useState(false)

  return (
    <PressableFeedback
      asChild
      isPressed={isPressed}
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
        <PressableFeedback.Ripple />
        <Text style={{ color: theme.colors.accentForeground }}>
          a bare Pressable, wearing the feedback and its own wave
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

function Note({ children }: { children: ReactNode }) {
  const theme = useXAUITheme()

  return (
    <Text style={{ color: theme.colors.muted, fontSize: theme.fontSizes.xs }}>
      {children}
    </Text>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
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
