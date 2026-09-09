import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListBox } from './list-box.context'
import type { ListBoxItemTitleProps } from './list-box.type'

/** What the row is. */
export const ListBoxItemTitle = forwardRef<Text, ListBoxItemTitleProps>(
  function ListBoxItemTitle({ children, style, ...props }, ref) {
    const { titleStyle } = useListBox()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[titleStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ListBoxItemTitle.displayName = 'XAUI.ListBox.ItemTitle'
