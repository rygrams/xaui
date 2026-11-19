import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext, Slot, useStyleProps } from '@xaui/native/system'
import { useListRow } from './list.context'
import type { ListLeadingProps } from './list.type'

/**
 * The square at the start of a row, 52 across and level with the title: a flat fill of
 * the accent with a glyph on it in the ink that reads there — black on lime, amber and
 * yellow — or, under `asChild`, a picture that fills it.
 *
 * ```tsx
 * <List.Leading><Icon as={SunIcon} /></List.Leading>
 * <List.Leading asChild><Image source={cover} /></List.Leading>
 * ```
 */
export const ListLeading = forwardRef<View, ListLeadingProps>(function ListLeading(
  { children, asChild = false, style, ...props },
  ref
) {
  const { styles } = useListRow()
  const [styleProps, rest] = useStyleProps(props)
  const Node = asChild ? Slot : View

  return (
    <IconContext.Provider value={styles.leadingGlyph}>
      <Node ref={ref} {...rest} style={[styles.leadingStyle, styleProps, style]}>
        {children}
      </Node>
    </IconContext.Provider>
  )
})

ListLeading.displayName = 'XAUI.Tram.List.Leading'
