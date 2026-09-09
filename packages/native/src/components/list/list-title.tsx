import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListTitleProps } from './list.type'

export const ListTitle = forwardRef<Text, ListTitleProps>(function ListTitle(
  { children, style, ...props },
  ref
) {
  const { titleStyle } = useList()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} {...rest} style={[titleStyle, styleProps, style]}>
      {children}
    </Text>
  )
})

ListTitle.displayName = 'XAUI.List.Title'
