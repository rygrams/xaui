import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarTextSlotProps } from './progress-bar.type'

/** What is happening. The sentence, next to a number that is only a number. */
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

ProgressBarLabel.displayName = 'XAUI.ProgressBar.Label'
