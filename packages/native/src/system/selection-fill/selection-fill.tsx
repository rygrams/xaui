import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import type { ReactNode } from 'react'
import type { SelectionFillProps } from './selection-fill.type'

/** Long enough to be seen, short enough that a fast tick never waits for it. */
const DURATION = 120

/** Where the fill starts before it grows into its box. */
const FROM_SCALE = 0.8

/**
 * The colour a control takes when it is on, and the mark that arrives with it — the
 * `Checkbox`'s check on its accent square, the `Radio`'s dot in its accent circle.
 *
 * It is a node of its own rather than a background on the box, because it has to fade and
 * grow in **without taking the border with it**, and the mark has to ride along: a check
 * arriving before its background reads as a glitch rather than as an animation.
 *
 * ```tsx
 * <SelectionFill isVisible={isSelected} style={fillStyle} animation={animation}>
 *   <Check />
 * </SelectionFill>
 * ```
 *
 * The style is the host component's own resolved `fill` slot (R5) — this owns the motion
 * and nothing else, which is what lets two components share it without sharing a recipe.
 */
export function SelectionFill({
  isVisible,
  style,
  animation = true,
  children,
}: SelectionFillProps) {
  // Two components rather than a branch inside one: hooks cannot be conditional, and "no
  // animation" is only true if the Reanimated hooks are never reached.
  if (!animation) {
    return isVisible ? <View style={style}>{children}</View> : null
  }

  return (
    <AnimatedFill isVisible={isVisible} style={style}>
      {children}
    </AnimatedFill>
  )
}

SelectionFill.displayName = 'XAUI.SelectionFill'

/**
 * Mounted whether or not the control is on, unlike the static half above: an exit
 * animation needs a node to run on, and a fill that unmounts the moment it is switched off
 * has nothing left to fade out.
 */
function AnimatedFill({
  isVisible,
  style,
  children,
}: {
  isVisible: boolean
  style: StyleProp<ViewStyle>
  children: ReactNode
}) {
  // `useDerivedValue` rather than an assignment in an effect: the timing starts on the UI
  // thread the frame the prop changes, instead of waiting for a commit to schedule it.
  const progress = useDerivedValue(
    () => withTiming(isVisible ? 1 : 0, { duration: DURATION }),
    [isVisible]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: FROM_SCALE + (1 - FROM_SCALE) * progress.value }],
  }))

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
}
