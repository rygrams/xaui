import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListContentProps } from './list.type'

export const ListContent = forwardRef<View, ListContentProps>(function ListContent(
  { children, style, ...props },
  ref
) {
  const { contentStyle } = useList()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
      {children}
    </View>
  )
})

ListContent.displayName = 'XAUI.List.Content'
