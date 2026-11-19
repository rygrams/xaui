import { Icon } from '@xaui/native/system'
import { useAppBarButton } from './app-bar.context'
import type { AppBarIconProps } from './app-bar.type'

/**
 * The glyph, taking the circle's size and the ink of its line without being told either.
 * An explicit `size` or `color` still wins.
 */
export function AppBarIcon({ size, color, ...rest }: AppBarIconProps) {
  const { icon } = useAppBarButton()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

AppBarIcon.displayName = 'XAUI.Tram.AppBar.Icon'
