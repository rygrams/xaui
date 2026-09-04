import { forwardRef } from 'react'
import { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { warnDev } from '../../utils/warn-dev'
import { PressableFeedback } from '../pressable-feedback'
import { useStyleProps } from '../style-props'
import { closeButtonSheet } from './close-button.style'
import type { CloseButtonProps } from './close-button.type'

/**
 * A cross is the right size to look at and the wrong size to hit. The target grows
 * outwards instead of the glyph growing, which costs nothing in layout.
 */
const HIT_SLOP = 8

/**
 * The dismiss affordance shared by everything that can be dismissed — `Chip.Close`,
 * `Alert.Close`, and the `Dialog`, `Snackbar` and `Sheet` of P5. Each of those is a
 * five-line call site handing it the styles its own recipe resolved:
 *
 * ```tsx
 * const { closeStyle, closeGlyphStyle, isDisabled } = useChip()
 *
 * <CloseButton
 *   name="Chip.Close"
 *   baseStyle={closeStyle}
 *   glyphStyle={closeGlyphStyle}
 *   isDisabled={isDisabled}
 * />
 * ```
 *
 * **It owns its press state**, unlike every other pressable in the library, where the
 * component root owns it because its recipe resolves on it. Here the surrounding
 * component is usually not a control at all, and where it is, the two are different
 * targets: pressing the cross must not read as pressing the chip around it.
 *
 * With no children it draws its own cross from two bars a quarter turn apart, so a
 * dismissible component works in a project that has installed no icon set.
 */
export const CloseButton = forwardRef<View, CloseButtonProps>(function CloseButton(
  {
    name,
    children,
    baseStyle,
    glyphStyle,
    accessibilityRole = 'button',
    hitSlop = HIT_SLOP,
    style,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  // A cross says "close" to someone who can see it and nothing at all to someone who
  // cannot — and unlike an icon-only button, the text beside it names the thing being
  // dismissed rather than the action, so there is nothing to fall back on.
  if (!rest.accessibilityLabel && !rest['aria-label']) {
    warnDev(
      `${name}: a close button needs an \`accessibilityLabel\` — the cross is not text, ` +
        'and the label beside it names what is being dismissed, not the action.'
    )
  }

  return (
    <PressableFeedback
      ref={ref}
      isPressed={isPressed}
      accessibilityRole={accessibilityRole}
      hitSlop={hitSlop}
      {...rest}
      // R9 — the caller's `style` may be `Pressable`'s function form. This component owns
      // the press state, so it resolves the function here rather than forwarding it and
      // losing the styles inside.
      style={[
        baseStyle,
        styleProps,
        typeof style === 'function' ? style({ pressed: isPressed }) : style,
      ]}
      // After `rest`, and composed rather than replacing: a caller's `onPressIn` runs,
      // and the pressed state still happens.
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {children ?? (
        <>
          <View style={[glyphStyle, closeButtonSheet.bar]} />
          <View style={[glyphStyle, closeButtonSheet.barMirrored]} />
        </>
      )}
    </PressableFeedback>
  )
})

CloseButton.displayName = 'XAUI.CloseButton'
