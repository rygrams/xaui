import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useToggleButton } from './toggle-button.context'
import type { ToggleButtonLabelProps } from './toggle-button.type'

export const ToggleButtonLabel = forwardRef<Text, ToggleButtonLabelProps>(
  function ToggleButtonLabel({ children, style, numberOfLines = 1, ...props }, ref) {
    const { labelStyle } = useToggleButton()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        style={[labelStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

ToggleButtonLabel.displayName = 'XAUI.ToggleButton.Label'
