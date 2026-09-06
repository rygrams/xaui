import { Icon } from '../../system/icon'
import { useFab } from './fab.context'
import type { FabIconProps } from './fab.type'

/**
 * The mark, taking the FAB's size and colour without being told either.
 *
 * The values come from the root, which resolved them once; an explicit `size` or `color`
 * still wins, which is what `Icon` promises everywhere else in the library.
 */
export function FabIcon({ size, color, ...rest }: FabIconProps) {
  const { icon } = useFab()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

FabIcon.displayName = 'XAUI.Fab.Icon'
