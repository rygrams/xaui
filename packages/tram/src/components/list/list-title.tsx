import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useListRow } from './list.context'
import type { ListTitleProps } from './list.type'

/**
 * What the row is, in the page's ink, on the `title` role and one line — Metro's extra
 * large row title. `numberOfLines` gives it more.
 */
export const ListTitle = forwardRef<Text, ListTitleProps>(function ListTitle(
  { children, numberOfLines = 1, style, ...props },
  ref
) {
  const { styles } = useListRow()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      {...rest}
      style={[styles.titleStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

ListTitle.displayName = 'XAUI.Tram.List.Title'
