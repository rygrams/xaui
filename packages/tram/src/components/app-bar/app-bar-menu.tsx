import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useAppBar } from './app-bar.context'
import type { AppBarMenuProps } from './app-bar.type'

/**
 * The entries the "…" uncovers, under the row of circles: words in the bar's ink, one per
 * row, for what does not deserve a circle. Written as a direct child of the `AppBar`,
 * which lays it under the row and opens room for it while the bar is open.
 *
 * Closed, it is clipped away and not read.
 */
export const AppBarMenu = forwardRef<View, AppBarMenuProps>(function AppBarMenu(
  { children, style, ...props },
  ref
) {
  const { styles } = useAppBar()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View
      ref={ref}
      accessibilityRole="menu"
      {...rest}
      style={[styles.menu, styleProps, style]}
    >
      {children}
    </View>
  )
})

AppBarMenu.displayName = 'XAUI.Tram.AppBar.Menu'
