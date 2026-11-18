import { Icon } from '@xaui/native/system'
import { useFab } from './fab.context'
import type { FabIconProps } from './fab.type'

/**
 * The glyph, taking the circle's size and the ink that reads on its fill without being
 * told either. An explicit `size` or `color` still wins.
 */
export function FabIcon({ size, color, ...rest }: FabIconProps) {
  const { icon } = useFab()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

FabIcon.displayName = 'XAUI.Tram.Fab.Icon'
