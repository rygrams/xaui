import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSlider } from './slider.context'
import type { SliderFillProps } from './slider.type'

/**
 * The part of the rail behind the knob.
 *
 * One thumb and it fills from the rail's start; two and it fills **between** them, which
 * is the whole visual difference a range makes.
 *
 * It is not animated. The knob it follows is under a finger, and a fill lagging behind the
 * knob by a spring reads as the two coming apart.
 */
export const SliderFill = forwardRef<View, SliderFillProps>(function SliderFill(
  { style, ...props },
  ref
) {
  const { fillStyle, fractions, trackLength, thumbSize, orientation } = useSlider()
  const [styleProps, rest] = useStyleProps(props)

  const travel = Math.max(trackLength - thumbSize, 0)
  const half = thumbSize / 2

  // One thumb fills from the rail's start; two fill between them. Both are measured to a
  // knob's **centre** rather than to the raw proportion, because the travel is inset by
  // half a knob at each end — a fill using the fraction alone would fall short of the knob
  // at the maximum and overshoot it at the minimum.
  const from = fractions.length > 1 ? fractions[0]! * travel + half : 0
  const to = fractions[fractions.length - 1]! * travel + half

  const vertical = orientation === 'vertical'

  return (
    <View
      ref={ref}
      {...rest}
      style={[
        fillStyle,
        vertical
          ? { bottom: from, height: to - from, top: undefined }
          : { start: from, width: to - from, end: undefined },
        styleProps,
        style,
      ]}
    />
  )
})

SliderFill.displayName = 'XAUI.Slider.Fill'
