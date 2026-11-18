import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useListBoxRow } from './list-box.context'
import type { ListBoxItemDescriptionProps } from './list-box.type'

/** What the row is set to, or what it does, in the muted grey under the title. */
export const ListBoxItemDescription = forwardRef<Text, ListBoxItemDescriptionProps>(
  function ListBoxItemDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useListBoxRow()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ListBoxItemDescription.displayName = 'XAUI.Tram.ListBox.ItemDescription'
