import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListItemDescriptionProps } from './list.type'

/** The quiet line under the title — what the row is currently set to, usually. */
export const ListItemDescription = forwardRef<Text, ListItemDescriptionProps>(
  function ListItemDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useList()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ListItemDescription.displayName = 'XAUI.List.ItemDescription'
