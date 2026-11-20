import { forwardRef, useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { GestureResponderEvent, TextStyle, View, ViewStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  IconContext,
  PressableFeedback,
  childrenToString,
  useStyleProps,
} from '@xaui/native/system'
import { useTramMotion } from '../../motion/use-tram-motion'
import { splitFieldStyle } from '../../system/split-field-style'
import { useTextField } from '../text-field'
import { DummyFieldValue } from './dummy-field-value'
import { useDummyField } from './dummy-field.context'
import type { DummyFieldFieldProps } from './dummy-field.type'

const AnimatedFeedback = Animated.createAnimatedComponent(PressableFeedback)

/**
 * The box: the `TextField`'s line of 2 round a value it only shows, and the control a screen
 * reader stops on — a button, named by the label and described by the help.
 *
 * ```tsx
 * <DummyField.Field placeholder="choisir un pays">{country}</DummyField.Field>
 * ```
 *
 * Text children become a `DummyField.Value`; anything else is laid in the row as it is —
 * a `Value` and an `Indicator`, an icon of your own. With no children it shows `value`.
 *
 * The press is the line and nothing else: it goes to the accent read as ink while the
 * finger is down, through `useTramMotion`, and back on release. The box keeps its place and
 * its fill — a field does not move. A `borderColor` written on it holds in every state.
 */
export const DummyFieldField = forwardRef<View, DummyFieldFieldProps>(
  function DummyFieldField(
    {
      children,
      value,
      placeholder,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      hitSlop,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const {
      fieldStyle,
      border,
      reach,
      labelId,
      descriptionId,
      errorId,
      isDisabled,
      isInvalid,
      isStill,
    } = useTextField()
    const { rowStyle, glyph, onPress: open } = useDummyField()
    const [styleProps, rest] = useStyleProps(props)
    const animate = useTramMotion()

    const line = useSharedValue(0)
    const moveLine = useCallback(
      (to: number) => {
        // Arrives and stops: a colour that bounces past its end has nowhere to go.
        line.value = isStill ? to : animate(to, 'navigation')
      },
      [line, isStill, animate]
    )

    const [isPressed, press] = usePressState({
      onPressIn: event => {
        moveLine(1)
        onPressIn?.(event)
      },
      onPressOut: event => {
        moveLine(0)
        onPressOut?.(event)
      },
    })

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        open?.(event)
      },
      [onPress, open]
    )

    // The `TextField`'s field, less its type: the box draws the line, the fill, the height
    // and the padding, and the value wears the type.
    const box = useMemo(
      () => splitFieldStyle(StyleSheet.flatten<TextStyle>(fieldStyle)).box,
      [fieldStyle]
    )

    const own = typeof style === 'function' ? style({ pressed: isPressed }) : style
    // A `borderColor` the caller wrote is theirs in every state: an animated style
    // outranks a static one wherever it sits in the array, so the line steps aside.
    const isLineOverridden =
      StyleSheet.flatten<ViewStyle>([styleProps, own])?.borderColor !== undefined

    const { rest: atRest, focus: pressed } = border
    const moving = useAnimatedStyle(() => {
      'worklet'
      return {
        borderColor: interpolateColor(line.value, [0, 1], [atRest, pressed]),
      }
    }, [line, atRest, pressed])

    const text = childrenToString(children)
    const content = asChild ? (
      children
    ) : children !== undefined && text === null ? (
      children
    ) : (
      <DummyFieldValue placeholder={placeholder}>{text ?? value}</DummyFieldValue>
    )

    return (
      <IconContext.Provider value={glyph}>
        <AnimatedFeedback
          // The animated wrapper types its ref as itself; at runtime it is the host view.
          ref={ref as never}
          isPressed={isPressed}
          isDisabled={isDisabled}
          asChild={asChild}
          // Native's scale, highlight and ripple stay off: the press is the line.
          animation={isStill ? 'disable-all' : false}
          accessibilityRole={accessibilityRole}
          // Merged, not spread over: a caller naming another state must not drop this one.
          accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
          // The label names the field; the description and the error explain it.
          aria-labelledby={labelId}
          aria-describedby={`${descriptionId} ${errorId}`}
          aria-invalid={isInvalid || undefined}
          // `sm` is drawn under the 48 touch target; the slop makes it up.
          hitSlop={hitSlop ?? reach}
          {...rest}
          style={[
            box,
            rowStyle,
            styleProps,
            own,
            isLineOverridden ? undefined : moving,
          ]}
          // After `rest`, and composed: the caller's handlers run inside these.
          onPress={handlePress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
        >
          {content}
        </AnimatedFeedback>
      </IconContext.Provider>
    )
  }
)

DummyFieldField.displayName = 'XAUI.Tram.DummyField.Field'
