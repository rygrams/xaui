import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useRadio } from './radio.context'
import type { RadioLabelProps } from './radio.type'

/**
 * What choosing this option means.
 *
 * It sits **inside** the pressable, so tapping the words chooses the option — which is why
 * this is a slot rather than a `Text` beside the component. It turns `danger` with
 * `isInvalid`, like the `Checkbox`'s.
 */
export const RadioLabel = forwardRef<Text, RadioLabelProps>(function RadioLabel(
  { children, style, ...props },
  ref
) {
  const { labelStyle } = useRadio()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} style={[labelStyle, styleProps, style]} {...rest}>
      {children}
    </Text>
  )
})

RadioLabel.displayName = 'XAUI.Radio.Label'
