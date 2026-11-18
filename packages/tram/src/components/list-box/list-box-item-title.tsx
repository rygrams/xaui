import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useListBoxRow } from './list-box.context'
import type { ListBoxItemTitleProps } from './list-box.type'

/** What the row is, in the page's ink — on the body, subtitle or title role. */
export const ListBoxItemTitle = forwardRef<Text, ListBoxItemTitleProps>(
  function ListBoxItemTitle({ children, style, ...props }, ref) {
    const { titleStyle } = useListBoxRow()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[titleStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ListBoxItemTitle.displayName = 'XAUI.Tram.ListBox.ItemTitle'
