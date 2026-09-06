import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListItemProps } from './list.type'

/**
 * One row, and it does **nothing**.
 *
 * A list is not necessarily a list of buttons. Most of them are a table of facts — a value
 * beside a label, a switch that is its own control — and a row that lights up under a
 * finger it never responds to is a promise the component does not keep. So the plain row
 * is a `View`: no press state, no wash, no role.
 *
 * A row you can press is `List.ItemButton`, used in its place. That is a structural choice
 * rather than an inferred one: a component that decided from the presence of an `onPress`
 * would still be guessing, and the guess is invisible in the JSX.
 */
export const ListItem = forwardRef<View, ListItemProps>(function ListItem(
  { children, asChild = false, style, ...props },
  ref
) {
  const { itemStyle, glyph } = useList()
  const [styleProps, rest] = useStyleProps(props)

  const Node = asChild ? Slot : View

  return (
    <IconContext.Provider value={glyph}>
      <Node ref={ref} {...rest} style={[itemStyle, styleProps, style]}>
        {children}
      </Node>
    </IconContext.Provider>
  )
})

ListItem.displayName = 'XAUI.List.Item'
