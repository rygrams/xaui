import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonLabelProps } from './slide-button.type'

/**
 * The instruction, centred across the whole pill. The thumb slides over it rather than
 * beside it — there is no gap to keep, because they are not laid out together.
 */
export const SlideButtonLabel = forwardRef<Text, SlideButtonLabelProps>(
  function SlideButtonLabel({ children, style, ...props }, ref) {
    const { labelStyle } = useSlideButton()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={1}
        {...rest}
        style={[labelStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

SlideButtonLabel.displayName = 'XAUI.SlideButton.Label'
