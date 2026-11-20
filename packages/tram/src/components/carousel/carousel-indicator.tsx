import { forwardRef } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { trackProgressFromOffset, useStyleProps } from '@xaui/native/system'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useCarousel } from './carousel.context'
import { barWidth, squareNearness } from './carousel.utils'
import type { CarouselDotProps, CarouselViewSlotProps } from './carousel.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * Where in the series the reader is: a row of squares in the faint grey, held to the
 * start, a square apart.
 *
 * With no children it draws one square per slide. Children are the long form — a subset,
 * a counter beside the squares, a shape of your own.
 */
export const CarouselIndicator = forwardRef<View, CarouselViewSlotProps>(
  function CarouselIndicator({ children, style, ...props }, ref) {
    const { indicatorStyle, count } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[indicatorStyle, styleProps, style]}>
        {children ??
          Array.from({ length: count }, (_, index) => (
            <CarouselDot key={index} index={index} />
          ))}
      </View>
    )
  }
)

CarouselIndicator.displayName = 'XAUI.Tram.Carousel.Indicator'

/**
 * One square, which stretches into a bar of the accent as its slide comes into view.
 *
 * **The square is the bar.** It grows in the row, so the row makes room. Its width and
 * its colour follow the live scroll offset on the UI thread — the bar grows out of one
 * square and into the next while the finger is still down. No corner: the Metro pill is a
 * bar.
 *
 * A screen reader hears "3/5" through `accessibilityValue` rather than a label this
 * library would have to pick a language for. Drawn 6 to 10 high, it is pressed 48 high.
 */
export const CarouselDot = forwardRef<View, CarouselDotProps>(function CarouselDot(
  { index, children, accessibilityState, hitSlop, style, onPress, ...props },
  ref
) {
  const {
    dotStyle,
    dotInk,
    offset,
    metrics,
    count,
    index: current,
    isDisabled,
    goTo,
    onInteract,
  } = useCarousel()
  const [styleProps, rest] = useStyleProps(props)
  const haptic = useTramHaptic()

  const { step } = metrics
  const { rest: restColor, active, size } = dotInk

  const grow = useAnimatedStyle(() => {
    'worklet'
    const progress = trackProgressFromOffset(offset.get(), step, count)
    const nearness = squareNearness(progress, index)

    return {
      width: barWidth(size, nearness),
      backgroundColor: interpolateColor(nearness, [0, 1], [restColor, active]),
    }
  }, [offset, step, count, index, size, restColor, active])

  // Only above and below: across, the next square is a square away.
  const reach = touchReach(size)

  return (
    <AnimatedPressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{
        selected: index === current,
        disabled: isDisabled,
        ...accessibilityState,
      }}
      // `text` too: iOS reads a bare range as a percentage. Figures need no language.
      accessibilityValue={{
        now: index + 1,
        min: 1,
        max: count,
        text: `${index + 1}/${count}`,
      }}
      disabled={isDisabled}
      hitSlop={hitSlop ?? { top: reach, bottom: reach }}
      {...rest}
      style={[dotStyle, grow, styleProps, style]}
      // Composed: the caller's runs, and the square still goes to its slide.
      onPress={event => {
        onPress?.(event)
        haptic('selection')
        onInteract()
        goTo(index)
      }}
    >
      {children}
    </AnimatedPressable>
  )
})

CarouselDot.displayName = 'XAUI.Tram.Carousel.Dot'
