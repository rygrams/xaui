import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarTextSlotProps } from './progress-bar.type'

/**
 * What is happening, set on the Tram scale by the bar's size — `caption`, `body`,
 * `subtitle`. The case is the app's: Tram draws what it is given.
 */
export const ProgressBarLabel = forwardRef<Text, ProgressBarTextSlotProps>(
  function ProgressBarLabel({ children, style, ...props }, ref) {
    const { labelStyle } = useProgressBar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[labelStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

ProgressBarLabel.displayName = 'XAUI.Tram.ProgressBar.Label'
