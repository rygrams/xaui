import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSwitch } from './switch.context'
import type { SwitchLabelProps } from './switch.type'

/**
 * What the setting is.
 *
 * It sits **inside** the pressable, so tapping the words flips the switch — the reason
 * this is a slot rather than a `Text` beside the component.
 *
 * It does not change with the state: "Mode sombre" is the setting whether it is on or off,
 * and a label that read "Activé" would be saying what the track already says.
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

SwitchLabel.displayName = 'XAUI.Switch.Label'
