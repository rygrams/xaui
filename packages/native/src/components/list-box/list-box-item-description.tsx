import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListBox } from './list-box.context'
import type { ListBoxItemDescriptionProps } from './list-box.type'

/** The quiet line under the title — what the row is currently set to, usually. */
export const ListBoxItemDescription = forwardRef<Text, ListBoxItemDescriptionProps>(
  function ListBoxItemDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useListBox()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ListBoxItemDescription.displayName = 'XAUI.ListBox.ItemDescription'
