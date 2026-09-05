import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSlider } from './slider.context'
import type { SliderOutputProps } from './slider.type'

/**
 * The value, in words.
 *
 * `children` may be a function, which is how a raw number becomes "42 %" or "1 h 20" — a
 * `format` prop would have been the same thing with less room in it.
 */
export const SliderOutput = forwardRef<Text, SliderOutputProps>(
  function SliderOutput({ children, style, ...props }, ref) {
    const { outputStyle, values } = useSlider()
    const [styleProps, rest] = useStyleProps(props)

    const value =
      values.length > 1 ? ([values[0]!, values[1]!] as const) : values[0]!
    // An en dash rather than a hyphen: the default is a span between two numbers, and a
    // hyphen between two numbers reads as a minus sign.
    const text =
      values.length > 1 ? `${values[0]} – ${values[1]}` : String(values[0])

    return (
      <Text ref={ref} {...rest} style={[outputStyle, styleProps, style]}>
        {typeof children === 'function' ? children(value) : (children ?? text)}
      </Text>
    )
  }
)

SliderOutput.displayName = 'XAUI.Slider.Output'
