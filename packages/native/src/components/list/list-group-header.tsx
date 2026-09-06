import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListGroup } from './list-group.context'
import type { ListGroupTextSlotProps } from './list-group.type'

/**
 * What the rows under it have in common.
 *
 * It is inset by the row's own padding rather than sitting flush with the container, so the
 * heading and the text it heads share a left edge. `accessibilityRole="header"` is on it by
 * default, which is what lets a screen reader jump between sections.
 */
export const ListGroupHeader = forwardRef<Text, ListGroupTextSlotProps>(
  function ListGroupHeader({ children, accessibilityRole, style, ...props }, ref) {
    const { headerStyle } = useListGroup()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole={accessibilityRole ?? 'header'}
        style={[headerStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

ListGroupHeader.displayName = 'XAUI.ListGroup.Header'
