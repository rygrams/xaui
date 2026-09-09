import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useList, useListItem } from './list.context'
import type { ListItemProps } from './list.type'

export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
  { children, asChild = false, style, ...props },
  ref
) {
  const { itemStyle, separatorStyle, leadingIcon } = useList()
  const { isLast } = useListItem()
  const [styleProps, rest] = useStyleProps(props)
  const Node = asChild ? Slot : View

  return (
    <IconContext.Provider value={leadingIcon}>
      <Node
        ref={ref}
        {...rest}
        style={[itemStyle, !isLast && separatorStyle, styleProps, style]}
      >
        {children}
      </Node>
    </IconContext.Provider>
  )
})

ListItem.displayName = 'XAUI.List.Item'
