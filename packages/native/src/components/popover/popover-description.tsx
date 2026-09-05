import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { usePopover } from './popover.context'
import type { PopoverDescriptionProps } from './popover.type'

/** The sentence under the heading. It wraps — that is what it exists to carry. */
export const PopoverDescription = forwardRef<Text, PopoverDescriptionProps>(
  function PopoverDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = usePopover()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

PopoverDescription.displayName = 'XAUI.Popover.Description'
