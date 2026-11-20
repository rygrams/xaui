import { forwardRef, isValidElement, useCallback, useContext } from 'react'
import { Text, View } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import Animated from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  useStyleProps,
} from '@xaui/native/system'
import { duration, scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { useCascade } from '../../system/use-cascade'
import { SwatchRankContext, useColorPicker } from './color-picker.context'
import { sameColor } from './color-picker.utils'
import type { ColorPickerSwatchProps } from './color-picker.type'

/**
 * One colour, offered.
 *
 * ```tsx
 * <ColorPicker.Swatch color="#0050EF" name="cobalt" />
 * ```
 *
 * Under `ramps` it is a row of the Windows Phone 7 accents list: a square of 48 and the
 * colour's `name` beside it, in `subtitle`. The chosen one is read by its name, written in
 * its own colour as ink — moved until it reads on the ground. Under `mosaic` it is a
 * square of the WP8 grid, and the chosen one wears a ring: a band of the ground 3 wide at
 * its edge, then a line of ink 2 wide. No check mark, no corner. A row with no name wears
 * the ring too, since there is no name to colour.
 *
 * Pressing it is the answer. It leans toward the finger and changes no colour. On the
 * page it arrives in the cascade, on a wrapper of its own: `ref` and `style` are the
 * swatch's.
 */
export const ColorPickerSwatch = forwardRef<View, ColorPickerSwatchProps>(
  function ColorPickerSwatch(
    {
      color,
      name,
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
      inkOf,
      layout,
      isOpen,
      isDisabled,
      isStill,
      isPaged,
      swatchStyle,
      swatchFillStyle,
      swatchNameStyle,
      swatchNameKeptStyle,
      ringStyle,
      ringLineStyle,
    } = useColorPicker()
    const rank = useContext(SwatchRankContext)
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    const isSelected = sameColor(value, color)

    // Off the page a swatch is simply there: no cascade, and no wrapper style to wait on.
    const arriving = useCascade({
      isOpen: isPaged ? isOpen : true,
      rank,
      isKept: isSelected,
      after: duration.swivel,
      isStill: isStill || !isPaged,
    })

    // Composed, never replaced: a caller's `onPress` runs, and the colour is still chosen.
    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        select(color)
      },
      [color, onPress, select]
    )

    const text = childrenToString(name)
    // Only what can be drawn: an empty string is no name, and a bare one outside a `Text`
    // would throw.
    const isNamed = layout === 'ramps' && (text !== null || isValidElement(name))
    const hasRing = isSelected && !isNamed
    const nameInk = !isSelected
      ? undefined
      : isDisabled
        ? swatchNameKeptStyle
        : { color: inkOf(color) }

    // Under an ancestor's `disable-all` the swatch does not lean either.
    const Row = isStill ? PressableFeedback : PressTilt
    const lean = isStill ? undefined : { depth: scale.row }

    return (
      <Animated.View style={isPaged ? arriving : undefined}>
        <Row
          ref={ref}
          isPressed={isPressed}
          isDisabled={isDisabled}
          // Native's scale, highlight and ripple stay off: the press is the tilt alone.
          animation={isStill ? 'disable-all' : false}
          // `radio`: the grid is a single choice, and a reader has to hear which is it.
          accessibilityRole="radio"
          // A colour is not text: the name, else the hex.
          accessibilityLabel={accessibilityLabel ?? text ?? color}
          // Merged, not spread over: a caller naming another state must not drop these.
          accessibilityState={{
            disabled: isDisabled,
            selected: isSelected,
            checked: isSelected,
            ...accessibilityState,
          }}
          {...lean}
          {...rest}
          style={[
            swatchStyle,
            styleProps,
            typeof style === 'function' ? style({ pressed: isPressed }) : style,
          ]}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          <View style={[swatchFillStyle, { backgroundColor: color }]}>
            {/* Over the colour, not around it: nothing moves when the answer does. */}
            {hasRing ? (
              <View pointerEvents="none" style={ringStyle}>
                <View style={ringLineStyle} />
              </View>
            ) : null}
          </View>
          {!isNamed ? null : text !== null ? (
            <Text numberOfLines={1} style={[swatchNameStyle, nameInk]}>
              {text}
            </Text>
          ) : (
            name
          )}
        </Row>
      </Animated.View>
    )
  }
)

ColorPickerSwatch.displayName = 'XAUI.Tram.ColorPicker.Swatch'
