import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { usePopover } from './popover.context'
import type { PopoverTitleProps } from './popover.type'

/** The panel's heading. A `header` for a screen reader, so the panel announces as one. */
export const PopoverTitle = forwardRef<Text, PopoverTitleProps>(
  function PopoverTitle(
    { children, accessibilityRole = 'header', style, ...props },
    ref
  ) {
    const { titleStyle } = usePopover()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole}
        {...rest}
        style={[titleStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

PopoverTitle.displayName = 'XAUI.Popover.Title'
