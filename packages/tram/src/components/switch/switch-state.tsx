import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSwitch } from './switch.context'
import type { SwitchStateProps } from './switch.type'

/**
 * The state, written out — the Metro row starts on it, in large, and ends on the switch.
 *
 * ```tsx
 * <Switch accessibilityLabel="wi-fi" justifyContent="space-between">
 *   <Switch.State on="activé" off="désactivé" />
 *   <Switch.Track>
 *     <Switch.Thumb />
 *   </Switch.Track>
 * </Switch>
 * ```
 *
 * It is the label's type and the label's place, with the words following the switch. Both
 * are the app's: Tram ships no language and rewrites no case.
 *
 * A row whose only text is its state has no name to announce, so give the switch an
 * `accessibilityLabel` — the setting, which Metro writes in grey above the row.
 */
export const SwitchState = forwardRef<Text, SwitchStateProps>(function SwitchState(
  { on, off, style, ...props },
  ref
) {
  const { labelStyle, isSelected } = useSwitch()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} style={[labelStyle, styleProps, style]} {...rest}>
      {isSelected ? on : off}
    </Text>
  )
})

SwitchState.displayName = 'XAUI.Tram.Switch.State'
