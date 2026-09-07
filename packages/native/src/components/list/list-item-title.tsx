import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListItemTitleProps } from './list.type'

/** What the row is. */
export const ListItemTitle = forwardRef<Text, ListItemTitleProps>(
  function ListItemTitle({ children, style, ...props }, ref) {
    const { titleStyle } = useList()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[titleStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ListItemTitle.displayName = 'XAUI.List.ItemTitle'
