import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { hexToRgb, isHex, rgbToHex } from '../../utils/colors'
import { useColorPicker } from './color-picker.context'
import type { ColorPickerSwatchProps } from './color-picker.type'

/**
 * One colour, offered.
 *
 * ```tsx
 * <ColorPicker.Group name="Brand">
 *   <ColorPicker.Swatch color="#7c3aed" accessibilityLabel="Violet 600" />
 *   <ColorPicker.Swatch color="#0ea5e9" accessibilityLabel="Sky 500" />
 * </ColorPicker.Group>
 * ```
 *
 * It is `Select.Item` for colours: pressing it is the answer, and it wears the ring while
 * it is the one. **It owns its press state**, unlike most controls in this library, for the
 * `CloseButton`'s reason — the root's recipe cannot resolve a state that belongs to one of
 * a hundred and forty-four cells.
 *
 * Two nodes rather than one, and the ring is the outer: a ring that appeared by thickening
 * the border would shrink the colour under it at the moment it is pressed. Both are drawn
 * at every cell, transparent until the cell is the answer, so choosing a colour changes one
 * colour and moves nothing.
 */
export const ColorPickerSwatch = forwardRef<View, ColorPickerSwatchProps>(
  function ColorPickerSwatch(
    {
      color,
      accessibilityLabel,
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const {
      value,
      select,
      isDisabled,
      swatchStyle,
      swatchSelectedStyle,
      swatchFillStyle,
    } = useColorPicker()

    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const isSelected = sameColor(value, color)

    // Composed, never replaced: a caller's `onPress` runs, and the colour is still chosen.
    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        select(color)
      },
      [color, onPress, select]
    )

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        // `radio` and not `button`: the grid is a single choice, and that is what a screen
        // reader has to be able to say — "selected" on the one that is, out of a set.
        accessibilityRole="radio"
        // A swatch is not text. Without this a screen reader reaches a hundred and
        // forty-four unnamed targets; `ColorPicker.Grid` passes the palette's own name.
        accessibilityLabel={accessibilityLabel ?? color}
        accessibilityState={{
          disabled: isDisabled,
          selected: isSelected,
          checked: isSelected,
          ...accessibilityState,
        }}
        {...rest}
        style={[
          swatchStyle,
          isSelected && swatchSelectedStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <View style={[swatchFillStyle, { backgroundColor: color }]} />
      </PressableFeedback>
    )
  }
)

ColorPickerSwatch.displayName = 'XAUI.ColorPicker.Swatch'

/**
 * Whether two colours are the same colour, rather than the same string.
 *
 * `#ABC`, `#abc` and `#aabbcc` are one colour written three ways, and a picker that
 * compared the strings would draw no ring at all on a caller who wrote their default in
 * upper case. Normalised through the engine's own parser rather than by a rule of this
 * component's, and only when both sides are hex — `value` can be anything a caller holds,
 * including a named colour the parser would throw on.
 */
function sameColor(value: string | undefined, color: string): boolean {
  if (value === undefined) return false
  if (!isHex(value) || !isHex(color)) return value === color
  return rgbToHex(hexToRgb(value)) === rgbToHex(hexToRgb(color))
}
