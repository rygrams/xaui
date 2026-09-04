import { forwardRef } from 'react'
import { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { warnDev } from '../../utils/warn-dev'
import { useChip } from './chip.context'
import { chipSheet } from './chip.style'
import type { ChipCloseProps } from './chip.type'

/**
 * A cross of 16pt is the right size to look at and the wrong size to hit. The slot keeps
 * its glyph and grows its touch target outwards, which costs nothing in layout.
 */
const HIT_SLOP = 8

/**
 * The dismiss affordance — a control in its own right, inside a chip that usually is not.
 *
 * ```tsx
 * <Chip variant="default">
 *   <Chip.Label>Design</Chip.Label>
 *   <Chip.Close onPress={remove} accessibilityLabel="Retirer le filtre Design" />
 * </Chip>
 * ```
 *
 * It owns its own press state rather than reading the chip's: the chip may be a `View`,
 * and even when it is pressable the two are different targets — pressing the cross must
 * not read as pressing the chip. `hitSlop` grows the target outwards, because a cross big
 * enough to hit is a cross too big to look right.
 *
 * With no children it draws its own cross from two bars a quarter turn apart, so a
 * dismissible chip works in a project that has installed no icon set. Passing a child —
 * a `Chip.Icon`, an SVG — replaces it.
 */
export const ChipClose = forwardRef<View, ChipCloseProps>(function ChipClose(
  {
    children,
    isDisabled,
    accessibilityRole = 'button',
    hitSlop = HIT_SLOP,
    style,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const { closeStyle, closeGlyphStyle, isDisabled: isChipDisabled } = useChip()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  // A cross says "close" to someone who can see it and nothing at all to someone who
  // cannot — and unlike an icon-only button, the text beside it names the chip rather
  // than the action, so there is nothing for a screen reader to fall back on.
  if (!rest.accessibilityLabel && !rest['aria-label']) {
    warnDev(
      'Chip.Close: a close button needs an `accessibilityLabel` — the cross is not text, ' +
        'and the chip’s own label names what is being removed, not the action.'
    )
  }

  return (
    <PressableFeedback
      ref={ref}
      isPressed={isPressed}
      // The chip's `isDisabled` reaches the cross, because a disabled chip that can still
      // be dismissed is not disabled. An explicit value on the slot still wins.
      isDisabled={isDisabled ?? isChipDisabled}
      accessibilityRole={accessibilityRole}
      hitSlop={hitSlop}
      {...rest}
      style={[
        closeStyle,
        styleProps,
        typeof style === 'function' ? style({ pressed: isPressed }) : style,
      ]}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {children ?? (
        <>
          <View style={[closeGlyphStyle, chipSheet.crossBar]} />
          <View style={[closeGlyphStyle, chipSheet.crossBarMirrored]} />
        </>
      )}
    </PressableFeedback>
  )
})

ChipClose.displayName = 'XAUI.Chip.Close'
