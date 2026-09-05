import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSlider } from './slider.context'
import type { SliderFillProps } from './slider.type'

/**
 * The part of the track that is behind the thumb.
 *
 * Its length runs to the thumb's **centre**, not to the track's proportion: the travel is
 * inset by half a thumb at each end, so a fill that used the raw fraction would fall short
 * of the thumb at the maximum and overshoot it at the minimum.
 *
 * It is not animated. The thumb it follows is under a finger, and a fill lagging behind
 * the thumb by a spring reads as the two coming apart.
 */
export const SliderFill = forwardRef<View, SliderFillProps>(function SliderFill(
  { style, ...props },
  ref
) {
  const { fillStyle, fraction, trackWidth, thumbWidth } = useSlider()
  const [styleProps, rest] = useStyleProps(props)

  const travel = Math.max(trackWidth - thumbWidth, 0)

  return (
    <View
      ref={ref}
      {...rest}
      style={[
        fillStyle,
        { width: fraction * travel + thumbWidth / 2 },
        styleProps,
        style,
      ]}
    />
  )
})

SliderFill.displayName = 'XAUI.Slider.Fill'
