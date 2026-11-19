import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useListRow } from './list.context'
import type { ListContentProps } from './list.type'

/** The text of the row, one level under the other: it takes what the rest leaves. */
export const ListContent = forwardRef<View, ListContentProps>(function ListContent(
  { children, style, ...props },
  ref
) {
  const { styles } = useListRow()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[styles.contentStyle, styleProps, style]}>
      {children}
    </View>
  )
})

ListContent.displayName = 'XAUI.Tram.List.Content'
