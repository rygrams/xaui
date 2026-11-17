import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSwitch } from './switch.context'
import type { SwitchLabelProps } from './switch.type'

/**
 * The text of the row, set on the Tram scale by the switch's size — `body`, `subtitle`,
 * `title`. It sits inside the pressable, so a tap on the words flips the switch.
 *
 * The case is the app's: Tram draws what it is given.
 */
export const SwitchLabel = forwardRef<Text, SwitchLabelProps>(function SwitchLabel(
  { children, style, ...props },
  ref
) {
  const { labelStyle } = useSwitch()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} style={[labelStyle, styleProps, style]} {...rest}>
      {children}
    </Text>
  )
})

SwitchLabel.displayName = 'XAUI.Tram.Switch.Label'
