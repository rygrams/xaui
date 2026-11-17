import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useCheckbox } from './checkbox.context'
import type { CheckboxLabelProps } from './checkbox.type'

/**
 * What ticking the box means, set on the Tram scale by the checkbox's size — `body`,
 * `subtitle`, `title`. It sits inside the pressable, so a tap on the words ticks the box.
 *
 * The case is the app's. A label long enough to wrap wants the box against its first
 * line: `<Checkbox alignItems="flex-start">`.
 */
export const CheckboxLabel = forwardRef<Text, CheckboxLabelProps>(
  function CheckboxLabel({ children, style, ...props }, ref) {
    const { labelStyle } = useCheckbox()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[labelStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

CheckboxLabel.displayName = 'XAUI.Tram.Checkbox.Label'
