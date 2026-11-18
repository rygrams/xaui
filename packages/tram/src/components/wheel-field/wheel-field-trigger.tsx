import { forwardRef, useCallback } from 'react'
import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react'
import { Text } from 'react-native'
import type { GestureResponderEvent, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  Icon,
  IconContext,
  PressableFeedback,
  useStyleProps,
} from '@xaui/native/system'
import { useWheelField } from './wheel-field.context'
import type {
  WheelFieldFieldProps,
  WheelFieldIndicatorProps,
  WheelFieldTriggerProps,
  WheelFieldValueProps,
} from './wheel-field.type'

/**
 * The field: the value in the `TextField`'s box, and the control a screen reader stops
 * on — a button that opens a page and says whether it is open. The box's line goes from
 * the page's ink to the accent's while the page is up. A press changes no colour, and
 * the field does not move: what moves is the page.
 */
export function makeTrigger(name: string) {
  const Trigger = forwardRef<View, WheelFieldTriggerProps>(function Trigger(
    {
      children,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      hitSlop,
      style,
      onPressIn,
      onPressOut,
      onPress,
      ...props
    },
    ref
  ) {
    const {
      boxStyle,
      triggerStyle,
      glyph,
      border,
      line,
      reach,
      isOpen,
      isDisabled,
      isInvalid,
      isStill,
      open,
      labelId,
      descriptionId,
      errorId,
      pageId,
    } = useWheelField()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })
    const { rest: atRest, open: opened } = border

    const framed = useAnimatedStyle(() => {
      'worklet'
      return { borderColor: interpolateColor(line.value, [0, 1], [atRest, opened]) }
    }, [line, atRest, opened])

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        onPress?.(event)
        open()
      },
      [onPress, open]
    )

    return (
      <Animated.View style={[boxStyle, framed]}>
        <IconContext.Provider value={glyph}>
          <PressableFeedback
            ref={ref}
            isPressed={isPressed}
            isDisabled={isDisabled}
            asChild={asChild}
            // Native's scale, highlight and ripple stay off: a field does not move.
            animation={isStill ? 'disable-all' : false}
            accessibilityRole={accessibilityRole}
            // Merged, not spread over: a caller naming another state must not drop these.
            accessibilityState={{
              disabled: isDisabled,
              expanded: isOpen,
              ...accessibilityState,
            }}
            aria-expanded={isOpen}
            aria-controls={pageId}
            aria-invalid={isInvalid || undefined}
            // The label names the field; the description and the error explain it.
            aria-labelledby={labelId}
            aria-describedby={`${descriptionId} ${errorId}`}
            // `sm` is drawn under the 48 touch target; the slop makes it up.
            hitSlop={hitSlop ?? reach}
            {...rest}
            style={[
              triggerStyle,
              styleProps,
              typeof style === 'function' ? style({ pressed: isPressed }) : style,
            ]}
            // After `rest`, and composed: the caller's handlers run inside these.
            onPress={handlePress}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
          >
            {children}
          </PressableFeedback>
        </IconContext.Provider>
      </Animated.View>
    )
  })

  Trigger.displayName = `XAUI.Tram.${name}.Trigger`

  return Trigger
}

/**
 * What is chosen, in the field's ink, or the placeholder until something is — read
 * through `Intl` with the root's `locale` and `formatOptions`. One line: the box's
 * height is set.
 */
export function makeValue(name: string) {
  const Value = forwardRef<Text, WheelFieldValueProps>(function Value(
    { placeholder, children, numberOfLines = 1, style, ...props },
    ref
  ) {
    const { valueStyle, placeholderStyle, label } = useWheelField()
    const [styleProps, rest] = useStyleProps(props)

    const text = children ?? label
    const isEmpty = text === undefined || text === ''

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[valueStyle, isEmpty && placeholderStyle, styleProps, style]}
      >
        {isEmpty ? placeholder : text}
      </Text>
    )
  })

  Value.displayName = `XAUI.Tram.${name}.Value`

  return Value
}

/** A glyph at the end of the field, in its ink — or nothing, unless given one. */
export function makeIndicator(name: string) {
  function Indicator({ as, ...props }: WheelFieldIndicatorProps) {
    if (!as) return null

    return <Icon as={as} {...props} />
  }

  Indicator.displayName = `XAUI.Tram.${name}.Indicator`

  return Indicator
}

/**
 * The trigger and its value in one tag. Children replace the value; everything else
 * lands on the trigger.
 */
export function makeField(
  name: string,
  Trigger: ForwardRefExoticComponent<WheelFieldTriggerProps & RefAttributes<View>>,
  Value: ComponentType<WheelFieldValueProps>
) {
  const Field = forwardRef<View, WheelFieldFieldProps>(function Field(
    { placeholder, children, ...props },
    ref
  ) {
    return (
      <Trigger ref={ref} {...props}>
        {children ?? <Value placeholder={placeholder} />}
      </Trigger>
    )
  })

  Field.displayName = `XAUI.Tram.${name}.Field`

  return Field
}
