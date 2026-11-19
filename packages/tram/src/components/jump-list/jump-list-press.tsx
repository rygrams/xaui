import { forwardRef } from 'react'
import { Text } from 'react-native'
import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { useReducedMotion } from 'react-native-reanimated'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  childrenToString,
  useAnimationDisabled,
  useStyleProps,
} from '@xaui/native/system'
import { PressTilt } from '../../system/press-tilt'
import { useTramHaptic } from '../../theme/tram-haptics'
import type { TramHaptic } from '../../theme/tram-haptics'
import { useJumpListGroup } from './jump-list.context'
import type { JumpListHeaderProps } from './jump-list.type'

type JumpListPressProps = JumpListHeaderProps & {
  boxStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  isDisabled: boolean
  /** What the press feels like, felt as the finger lands. */
  moment: TramHaptic
  reach?: number
  /** What the press does, after the caller's `onPress`. */
  act: () => void
}

/**
 * A header or a key: a flat square that leans toward the finger, its text set in the role
 * of its size, and what it does when pressed. Disabled, it does not move and does
 * nothing. With motion reduced, or under `disable-all`, it does not lean.
 */
export const JumpListPress = forwardRef<View, JumpListPressProps>(
  function JumpListPress(
    {
      children,
      boxStyle,
      labelStyle,
      isDisabled,
      moment,
      reach = 0,
      act,
      asChild = false,
      accessibilityRole = 'button',
      accessibilityState,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const group = useJumpListGroup()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const isStill = useAnimationDisabled()
    const isReduced = useReducedMotion()
    const [isPressed, press] = usePressState({
      onPressIn: event => {
        haptic(moment)
        onPressIn?.(event)
      },
      onPressOut,
    })

    const handlePress = (event: GestureResponderEvent) => {
      onPress?.(event)
      act()
    }

    const drawn = typeof children === 'function' ? children(group) : children
    const content = drawn ?? group.title
    const text = childrenToString(content)

    const Box = isStill || isReduced ? PressableFeedback : PressTilt

    return (
      <Box
        ref={ref}
        isPressed={isPressed}
        isDisabled={isDisabled}
        asChild={asChild}
        // Native's scale, highlight and ripple stay off: the press is the tilt alone.
        animation={isStill ? 'disable-all' : false}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={text ?? undefined}
        // Merged, not spread over: a caller naming another state keeps this one.
        accessibilityState={{ disabled: isDisabled, ...accessibilityState }}
        hitSlop={reach > 0 ? reach : undefined}
        {...rest}
        style={[
          boxStyle,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        onPress={handlePress}
      >
        {/* Under `asChild` the one child is the caller's element, merged into. */}
        {asChild ? (
          content
        ) : text !== null ? (
          <Text style={labelStyle} numberOfLines={1}>
            {text}
          </Text>
        ) : (
          content
        )}
      </Box>
    )
  }
)

JumpListPress.displayName = 'XAUI.Tram.JumpList.Press'
