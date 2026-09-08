import { Icon } from '../../system/icon'
import type { FabMenuIconProps } from './fab-menu.type'

/**
 * A mark on a pill, at the word's colour and one step above nothing — the size and the ink
 * come from `IconContext`, which `Fab.Menu.Item` publishes from the resolved label.
 *
 * It is `Icon` with no props of its own, so the three forms it accepts are the three
 * everywhere else in the library: a component through `as`, a raw SVG as children, or an
 * image through `source`.
 */
export function FabMenuIcon(props: FabMenuIconProps) {
  return <Icon {...props} />
}

FabMenuIcon.displayName = 'XAUI.Fab.Menu.Icon'
