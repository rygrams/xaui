import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListBoxGroup } from './list-box-group.context'
import type { ListBoxGroupTextSlotProps } from './list-box-group.type'

/**
 * What the rows under it have in common.
 *
 * It is inset by the row's own padding rather than sitting flush with the container, so the
 * heading and the text it heads share a left edge. `accessibilityRole="header"` is on it by
 * default, which is what lets a screen reader jump between sections.
 */
export const ListBoxGroupHeader = forwardRef<Text, ListBoxGroupTextSlotProps>(
  function ListBoxGroupHeader(
    { children, accessibilityRole, style, ...props },
    ref
  ) {
    const { headerStyle } = useListBoxGroup()
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

ListBoxGroupHeader.displayName = 'XAUI.ListBoxGroup.Header'
