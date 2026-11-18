import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { ListBoxRowProvider, useListBox } from './list-box.context'
import type { ListBoxItemProps } from './list-box.type'

/**
 * One row, and it does **nothing**: no press, no movement, no wash. Most rows of a
 * settings page are a fact beside a label, or a switch that is its own control — and that
 * control keeps its role, its press and its spring, since the row claims none of them.
 *
 * A row you can press is `ListBox.ItemButton`, used in its place.
 */
export const ListBoxItem = forwardRef<View, ListBoxItemProps>(function ListBoxItem(
  { children, asChild = false, role = 'listitem', style, ...props },
  ref
) {
  const { live, grey, isDisabled } = useListBox()
  const [styleProps, rest] = useStyleProps(props)
  const row = isDisabled ? grey : live

  const Node = asChild ? Slot : View

  return (
    <ListBoxRowProvider value={row}>
      <Node
        ref={ref}
        role={role}
        {...rest}
        style={[row.itemStyle, styleProps, style]}
      >
        {children}
      </Node>
    </ListBoxRowProvider>
  )
})

ListBoxItem.displayName = 'XAUI.Tram.ListBox.Item'
