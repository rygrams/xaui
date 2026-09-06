import { forwardRef } from 'react'
import { Pressable, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { progressFromOffset } from '../../utils/carousel'
import { useCarousel } from './carousel.context'
import type { CarouselDotProps, CarouselViewSlotProps } from './carousel.type'

/** A dot is the right size to look at and the wrong size to hit. */
const HIT_SLOP = 8

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * Where in the series the reader is.
 *
 * With no children it draws one dot per slide, which is what it is for. Children are the
 * long form — a counter beside the dots, a subset, a shape of your own:
 *
 * ```tsx
 * <Carousel.Indicator>
 *   {photos.map((photo, index) => <Carousel.Dot key={photo.id} index={index} />)}
 *   <Carousel.Counter />
 * </Carousel.Indicator>
 * ```
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

CarouselIndicator.displayName = 'XAUI.Carousel.Indicator'

/**
 * One dot, which stretches into a pill as its slide comes into view.
 *
 * **The dot is the pill.** It grows in the row rather than being covered by a wider node
 * over it: an overlay keeps the row's width fixed, so the pill spills over the dots either
 * side and the reader sees a coloured lozenge with a grey dot half under it. Widening the
 * dot itself means the row makes room, which is the shape this indicator actually is.
 *
 * **It follows the drag rather than the settle.** The width and the colour are interpolated
 * from the live scroll offset on the UI thread, so the pill grows out of one dot and into
 * the next while the finger is still down — which is what makes a reader believe the
 * indicator is attached to the thing they are moving. Reading the settled index instead
 * would make it jump once per gesture, after the fact.
 *
 * **A screen reader hears "3 of 5" rather than a label**, through `accessibilityValue`. A
 * dot has no text of its own, and inventing one would be picking a language on behalf of
 * every app that installs this.
 */
export const CarouselDot = forwardRef<View, CarouselDotProps>(function CarouselDot(
  { index, children, style, ...props },
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

  const { step } = metrics
  const { rest: restColor, active, width, pill } = dotInk

  const grow = useAnimatedStyle(() => {
    const distance = Math.abs(progressFromOffset(offset.get(), step, count) - index)
    // Linear between two dots and nothing beyond them: `1 − distance` clamped at zero is a
    // triangle, and a triangle is what makes a dot take width exactly as fast as its
    // neighbour gives it up — so the row's total width never changes mid-travel and the
    // dots either side do not shuffle.
    const nearness = Math.max(0, 1 - distance)

    return {
      width: width + (pill - width) * nearness,
      backgroundColor: interpolateColor(nearness, [0, 1], [restColor, active]),
    }
  })

  return (
    <AnimatedPressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ selected: index === current, disabled: isDisabled }}
      accessibilityValue={{ now: index + 1, min: 1, max: count }}
      disabled={isDisabled}
      hitSlop={HIT_SLOP}
      {...rest}
      style={[dotStyle, grow, styleProps, style]}
      onPress={() => {
        onInteract()
        goTo(index)
      }}
    >
      {children}
    </AnimatedPressable>
  )
})

CarouselDot.displayName = 'XAUI.Carousel.Dot'
