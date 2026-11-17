import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useRadio } from './radio.context'
import type { RadioLabelProps } from './radio.type'

/**
 * What choosing this option means, set on the Tram scale by the radio's size — `body`,
 * `subtitle`, `title`. It sits inside the pressable, so a tap on the words chooses the
 * option.
 *
 * The case is the app's. A label long enough to wrap wants the circle against its first
 * line: `<Radio alignItems="flex-start">`.
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

RadioLabel.displayName = 'XAUI.Tram.Radio.Label'
