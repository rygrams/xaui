import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useListBoxRow } from './list-box.context'
import type { ListBoxItemContentProps } from './list-box.type'

/** The title and its description, one over the other, taking what the row leaves. */
export const ListBoxItemContent = forwardRef<View, ListBoxItemContentProps>(
  function ListBoxItemContent({ children, style, ...props }, ref) {
    const { contentStyle } = useListBoxRow()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListBoxItemContent.displayName = 'XAUI.Tram.ListBox.ItemContent'
