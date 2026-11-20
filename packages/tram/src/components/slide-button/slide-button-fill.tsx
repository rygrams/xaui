import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useSlideButton } from './slide-button.context'
import { trailWidth } from './slide-button.travel'
import type { SlideButtonFillProps } from './slide-button.type'

/**
 * The trail behind the thumb — the accent's soft slice, from the start edge to the middle
 * of the thumb, so the thumb always stands half on it. How far the slide has come, not a
 * state.
 *
 * ```tsx
 * <SlideButton.Fill />
 * ```
 *
 * Optional: compose it for the affordance, leave it out for a bare box. Once the slide has
 * counted it fades as the whole box fills with the accent under it.
 *
 * It reads the offset the thumb is moved by, so the two never come apart — under the
 * finger as on the spring. Its `start` mirrors under RTL, and a width needs no flipping.
 */
export const SlideButtonFill = forwardRef<View, SlideButtonFillProps>(
  function SlideButtonFill({ style, ...props }, ref) {
    const { fillStyle, offset, done, inset, thumbSize } = useSlideButton()
    const [styleProps, rest] = useStyleProps(props)

    const trail = useAnimatedStyle(() => {
      'worklet'
      return {
        width: trailWidth(offset.value, { inset, thumbWidth: thumbSize }),
        opacity: 1 - done.value,
      }
    }, [offset, done, inset, thumbSize])

    return (
      <Animated.View
        ref={ref}
        pointerEvents="none"
        {...rest}
        style={[fillStyle, styleProps, style, trail]}
      />
    )
  }
)

SlideButtonFill.displayName = 'XAUI.Tram.SlideButton.Fill'
