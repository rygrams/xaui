import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListDescriptionProps } from './list.type'

export const ListDescription = forwardRef<Text, ListDescriptionProps>(
  function ListDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useList()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ListDescription.displayName = 'XAUI.List.Description'
