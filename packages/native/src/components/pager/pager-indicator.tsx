import { forwardRef } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { progressFromOffset } from '../../utils/carousel'
import { usePager } from './pager.context'
import type { PagerDotProps, PagerViewSlotProps } from './pager.type'

/** A dot is the right size to look at and the wrong size to hit. */
const HIT_SLOP = 8

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * Which page the reader is on.
 *
 * With no children it draws one dot per page, which is what it is for. Children are the long
 * form — a subset, a label beside them, a shape of your own:
 *
 * ```tsx
 * <Pager.Indicator>
 *   {steps.map((step, index) => (
 *     <Pager.Dot key={step.id} index={index} />
 *   ))}
 * </Pager.Indicator>
 * ```
 *
 * It sits **in the flow**, under the pages. A caller who wants it over them says so —
 * `position="absolute" bottom={16} start={0} end={0}` — which is what the style props are
 * for; absolute by default would have made the common case the one that needs undoing.
 */
export const PagerIndicator = forwardRef<View, PagerViewSlotProps>(
  function PagerIndicator({ children, style, ...props }, ref) {
    const { indicatorStyle, count } = usePager()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        {children ??
          Array.from({ length: count }, (_, index) => (
            <PagerDot key={index} index={index} />
          ))}
      </View>
    )
  }
)

PagerIndicator.displayName = 'XAUI.Pager.Indicator'

/**
 * One dot.
 *
 * **It changes colour, it does not stretch.** That is the difference from
 * `Carousel.Dot`, and it is deliberate rather than a simplification: a page control is a
 * fixed row of marks saying how many screens there are and which one you are on, and a mark
 * that grows makes the row's arithmetic move under a reader who is counting it. The
 * carousel's pill is a *progress* indicator over a series; this is a position among screens.
 *
 * **It follows the drag rather than the settle.** The colour is interpolated from the live
 * scroll offset on the UI thread, so it travels while the finger is still down — which is
 * what makes a reader believe the dots are attached to the thing they are moving. Reading
 * the settled index instead would make it jump once per gesture, after the fact.
 *
 * **A screen reader hears "3 of 5" rather than a label**, through `accessibilityValue`. A dot
 * has no text of its own, and inventing one would be picking a language on behalf of every
 * app that installs this.
 */
export const PagerDot = forwardRef<View, PagerDotProps>(function PagerDot(
  { index, children, style, ...props },
  ref
) {
  const {
    dotStyle,
    dotInk,
    offset,
    step,
    count,
    index: current,
    isDisabled,
    goTo,
  } = usePager()
  const [styleProps, rest] = useStyleProps(props)
  const { rest: restColor, active } = dotInk

  const travel = useAnimatedStyle(() => {
    'worklet'
    const distance = Math.abs(progressFromOffset(offset.get(), step, count) - index)
    // Linear between two dots and nothing beyond them: `1 − distance` clamped at zero hands
    // the colour over at exactly the rate the neighbour takes it, so the two never both read
    // as current and never both read as behind.
    const nearness = Math.max(0, 1 - distance)

    return {
      backgroundColor: interpolateColor(nearness, [0, 1], [restColor, active]),
    }
  }, [offset, step, count, index, restColor, active])

  return (
    <AnimatedPressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ selected: index === current, disabled: isDisabled }}
      accessibilityValue={{ now: index + 1, min: 1, max: count }}
      disabled={isDisabled}
      hitSlop={HIT_SLOP}
      {...rest}
      style={[dotStyle, travel, styleProps, style]}
      onPress={() => goTo(index)}
    >
      {children}
    </AnimatedPressable>
  )
})

PagerDot.displayName = 'XAUI.Pager.Dot'
