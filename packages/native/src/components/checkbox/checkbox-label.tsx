import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useCheckbox } from './checkbox.context'
import type { CheckboxLabelProps } from './checkbox.type'

/**
 * What ticking the box means.
 *
 * It sits **inside** the pressable, so tapping the words toggles the checkbox — which is
 * why this is a slot rather than a `Text` beside the component. It turns `danger` with
 * `isInvalid`, like the `Input`'s label.
 *
 * A label long enough to wrap wants the box against its first line rather than centred on
 * the paragraph: `<Checkbox alignItems="flex-start">` is that, in style props (R14).
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

CheckboxLabel.displayName = 'XAUI.Checkbox.Label'
