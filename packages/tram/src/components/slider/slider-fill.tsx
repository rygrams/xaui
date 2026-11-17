import { forwardRef } from 'react'
import { I18nManager } from 'react-native'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { travelOn } from '../../system/value-scale'
import { useSlider } from './slider.context'
import type { SliderFillProps } from './slider.type'

/**
 * The filled part of the line, in the accent: from the start of the track to the middle
 * of the thumb, or from one thumb's middle to the other's on a range.
 *
 * ```tsx
 * <Slider.Fill />
 * ```
 *
 * It reads the numbers the thumbs are moved by, so the two never come apart — on the
 * spring as under the finger. Moved by a transform, which does not mirror under RTL the
 * way `start` does, so the direction is flipped here by hand.
 */
export const SliderFill = forwardRef<View, SliderFillProps>(function SliderFill(
  { style, ...props },
  ref
) {
  const { fillStyle, thumbs, values, trackLength, thumbLength, orientation } =
    useSlider()
  const [styleProps, rest] = useStyleProps(props)

  const [lower, upper] = thumbs
  const isRange = values.length > 1
  const isVertical = orientation === 'vertical'
  const travel = travelOn(trackLength, thumbLength)
  const towardEnd = I18nManager.isRTL ? -1 : 1

  const filled = useAnimatedStyle(() => {
    'worklet'
    const half = thumbLength / 2
    const from = isRange ? lower.place.value * travel + half : 0
    const to = (isRange ? upper.place.value : lower.place.value) * travel + half
    const length = Math.max(to - from, 0)

    return isVertical
      ? { height: length, transform: [{ translateY: -from }] }
      : { width: length, transform: [{ translateX: from * towardEnd }] }
  }, [lower, upper, isRange, isVertical, travel, thumbLength, towardEnd])

  return (
    <Animated.View
      ref={ref}
      {...rest}
      style={[fillStyle, styleProps, style, filled]}
    />
  )
})

SliderFill.displayName = 'XAUI.Tram.Slider.Fill'
