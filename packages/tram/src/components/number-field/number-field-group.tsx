import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTextField } from '../text-field'
import { NumberFieldGroupProvider, useNumberField } from './number-field.context'
import type { NumberFieldGroupProps } from './number-field.type'

/**
 * The box: one line of ink around the decrement, the field and the increment, which turns
 * to the accent while the field has the focus — the `TextField`'s line, drawn around the
 * three instead of around the field alone.
 *
 * It stands where Native puts a `FieldGroup`, which Tram does not have: Native lays its
 * steppers over the field and measures them, Tram draws one row. The field inside gives
 * up its own line and tells the box when it has the focus.
 */
export const NumberFieldGroup = forwardRef<View, NumberFieldGroupProps>(
  function NumberFieldGroup({ children, style, ...props }, ref) {
    const { groupStyle } = useNumberField()
    const { border } = useTextField()
    const [styleProps, rest] = useStyleProps(props)
    const focus = useSharedValue(0)

    const { rest: atRest, focus: focused } = border
    const line = useAnimatedStyle(() => {
      'worklet'
      return {
        borderColor: interpolateColor(focus.value, [0, 1], [atRest, focused]),
      }
    }, [focus, atRest, focused])

    // A `borderColor` the caller wrote is theirs in every state, as on the field.
    const isLineOverridden =
      StyleSheet.flatten([styleProps, style])?.borderColor !== undefined

    const group = useMemo(() => ({ focus }), [focus])

    return (
      <NumberFieldGroupProvider value={group}>
        <Animated.View
          ref={ref}
          {...rest}
          style={[
            groupStyle,
            styleProps,
            style,
            isLineOverridden ? undefined : line,
          ]}
        >
          {children}
        </Animated.View>
      </NumberFieldGroupProvider>
    )
  }
)

NumberFieldGroup.displayName = 'XAUI.Tram.NumberField.Group'
