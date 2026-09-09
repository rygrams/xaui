import { FabDiscovery as FabDiscoveryRoot } from './fab-discovery'
import { FabDiscoveryAction } from './fab-discovery-action'
import { FabDiscoveryContent } from './fab-discovery-content'
import { FabDiscoveryDescription } from './fab-discovery-description'
import { FabDiscoveryOverlay } from './fab-discovery-overlay'
import { FabDiscoveryTarget } from './fab-discovery-target'
import { FabDiscoveryTitle } from './fab-discovery-title'
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

/** A FAB menu compound, exported alongside `Fab` from the same entry point. */
export const FabMenu = Object.assign(FabMenuRoot, {
  Trigger: FabMenuTrigger,
  Overlay: FabMenuOverlay,
  Content: FabMenuContent,
  Item: FabMenuItem,
  Label: FabMenuLabel,
  Icon: FabMenuIcon,
})

/** A coach-mark compound, exported alongside `Fab` from the same entry point. */
export const FabDiscovery = Object.assign(FabDiscoveryRoot, {
  Target: FabDiscoveryTarget,
  Overlay: FabDiscoveryOverlay,
  Content: FabDiscoveryContent,
  Title: FabDiscoveryTitle,
  Description: FabDiscoveryDescription,
  Action: FabDiscoveryAction,
})

export const Fab = Object.assign(FabRoot, {
  Icon: FabIcon,
  Label: FabLabel,
  Spinner: FabSpinner,
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
export { FabDiscovery as FabDiscoveryRoot } from './fab-discovery'
export { FabDiscoveryAction } from './fab-discovery-action'
export { FabDiscoveryContent } from './fab-discovery-content'
export { FabDiscoveryDescription } from './fab-discovery-description'
export { FabDiscoveryOverlay } from './fab-discovery-overlay'
export { FabDiscoveryTarget } from './fab-discovery-target'
export { FabDiscoveryTitle } from './fab-discovery-title'
export { useFabDiscovery } from './fab-discovery.context'
export { fabDiscoveryRecipe } from './fab-discovery.recipe'
export type {
  FabDiscoveryActionProps,
  FabDiscoveryAnchor,
  FabDiscoveryContentProps,
  FabDiscoveryContextValue,
  FabDiscoveryDescriptionProps,
  FabDiscoveryOverlayProps,
  FabDiscoveryProps,
  FabDiscoverySlot,
  FabDiscoveryTargetProps,
  FabDiscoveryTitleProps,
} from './fab-discovery.type'
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
