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
 * **The ring is drawn over the cell, not around it.** As a border it would reserve its own
 * width at every cell whether or not that cell is the answer, and six points of ground
 * between two colours is not a ramp — the cells of one ramp touch. A border that appeared
 * only on the chosen cell, which is what the legacy picker did, shrinks the swatch under
 * the finger at the moment it is pressed. Over the top, nothing moves and nothing is
 * reserved.
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
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={handlePress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        <View style={[swatchFillStyle, { backgroundColor: color }]} />
        {/* After the fill, so it is over it; inert, so the press belongs to the cell. */}
        {isSelected ? (
          <View pointerEvents="none" style={swatchSelectedStyle} />
        ) : null}
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
