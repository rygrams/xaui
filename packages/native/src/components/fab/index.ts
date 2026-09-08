import { FabIcon } from './fab-icon'
import { FabLabel } from './fab-label'
import { FabMenu as FabMenuRoot } from './fab-menu'
import { FabMenuContent } from './fab-menu-content'
import { FabMenuIcon } from './fab-menu-icon'
import { FabMenuItem } from './fab-menu-item'
import { FabMenuLabel } from './fab-menu-label'
import { FabMenuOverlay } from './fab-menu-overlay'
import { FabMenuTrigger } from './fab-menu-trigger'
import { FabRoot } from './fab'
import { FabSpinner } from './fab-spinner'

/**
 * The menu is a compound of its own, attached here rather than shipped as its own subpath
 * — the `Calendar.YearPicker`'s arrangement, for its reason: it is a `Fab` with a list
 * behind it, its trigger renders this component, and a caller who has the FAB has the
 * menu. One import, one entry point, and no cycle between two barrels.
 */
export const FabMenu = Object.assign(FabMenuRoot, {
  Trigger: FabMenuTrigger,
  Overlay: FabMenuOverlay,
  Content: FabMenuContent,
  Item: FabMenuItem,
  Label: FabMenuLabel,
  Icon: FabMenuIcon,
})

export const Fab = Object.assign(FabRoot, {
  Icon: FabIcon,
  Label: FabLabel,
  Spinner: FabSpinner,
  Menu: FabMenu,
})

export { FabRoot } from './fab'
export { FabIcon } from './fab-icon'
export { FabLabel } from './fab-label'
export { FabSpinner } from './fab-spinner'
export { useFab } from './fab.context'
export { fabRecipe } from './fab.recipe'

export { FabMenu as FabMenuRoot } from './fab-menu'
export { FabMenuContent } from './fab-menu-content'
export { FabMenuIcon } from './fab-menu-icon'
export { FabMenuItem } from './fab-menu-item'
export { FabMenuLabel } from './fab-menu-label'
export { FabMenuOverlay } from './fab-menu-overlay'
export { FabMenuTrigger } from './fab-menu-trigger'
export { useFabMenu } from './fab-menu.context'
export { fabMenuRecipe } from './fab-menu.recipe'
export type {
  FabMenuAlign,
  FabMenuAnchor,
  FabMenuContentProps,
  FabMenuContextValue,
  FabMenuIconProps,
  FabMenuInsets,
  FabMenuItemProps,
  FabMenuLabelProps,
  FabMenuOverlayProps,
  FabMenuPlacement,
  FabMenuProps,
  FabMenuSize,
  FabMenuSlot,
  FabMenuTriggerProps,
  FabMenuWidth,
} from './fab-menu.type'
export type { FabSpinnerProps } from './fab-spinner'
export type {
  FabContextValue,
  FabIconProps,
  FabLabelProps,
  FabPlacement,
  FabProps,
  FabSize,
  FabSlot,
  FabVariant,
} from './fab.type'
