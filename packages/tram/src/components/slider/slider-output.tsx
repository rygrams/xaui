import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { fromStops } from '../../system/value-scale'
import { useSlider } from './slider.context'
import type { SliderOutputProps } from './slider.type'

/**
 * The value, written out on the Tram scale by the slider's size — `body`, `subtitle`,
 * `title`.
 *
 * ```tsx
 * <Slider.Output />
 * <Slider.Output>{value => `${value} %`}</Slider.Output>
 * ```
 *
 * `children` may be a function of the value, which is how a number becomes "42 %". With
 * none it is the number, or the two ends of a range joined by an en dash — a hyphen
 * between two numbers reads as a minus.
 */
export const SliderOutput = forwardRef<Text, SliderOutputProps>(
  function SliderOutput({ children, style, ...props }, ref) {
    const { outputStyle, values } = useSlider()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[outputStyle, styleProps, style]}>
        {typeof children === 'function'
          ? children(fromStops(values))
          : (children ?? values.join(' – '))}
      </Text>
    )
  }
)

SliderOutput.displayName = 'XAUI.Tram.Slider.Output'
