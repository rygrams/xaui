import { MenuContent } from './menu-content'
import { MenuGroup } from './menu-group'
import { MenuItem } from './menu-item'
import { MenuItemDescription } from './menu-item-description'
import { MenuItemIndicator } from './menu-item-indicator'
import { MenuItemTitle } from './menu-item-title'
import { MenuLabel } from './menu-label'
import { MenuOverlay } from './menu-overlay'
import { MenuSeparator } from './menu-separator'
import { MenuTrigger } from './menu-trigger'
import { MenuRoot } from './menu'

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Overlay: MenuOverlay,
  Content: MenuContent,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Group: MenuGroup,
  Item: MenuItem,
  ItemTitle: MenuItemTitle,
  ItemDescription: MenuItemDescription,
  ItemIndicator: MenuItemIndicator,
})

export { MenuRoot } from './menu'
export { MenuContent } from './menu-content'
export { MenuGroup } from './menu-group'
export { MenuItem } from './menu-item'
export { MenuItemDescription } from './menu-item-description'
export { MenuItemIndicator } from './menu-item-indicator'
export { MenuItemTitle } from './menu-item-title'
export { MenuLabel } from './menu-label'
export { MenuOverlay } from './menu-overlay'
export { MenuSeparator } from './menu-separator'
export { MenuTrigger } from './menu-trigger'
export { useMenu, useMenuItem } from './menu.context'
export { menuPlace } from './menu.place'
export type {
  MenuOffset,
  MenuPlace,
  MenuPlaceInput,
  MenuRect,
  MenuSide,
} from './menu.place'
export { menuRecipe } from './menu.recipe'
export type {
  MenuAnchor,
  MenuContentProps,
  MenuContextValue,
  MenuGroupProps,
  MenuItemContextValue,
  MenuItemDescriptionProps,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuItemRenderState,
  MenuItemTitleProps,
  MenuItemVariant,
  MenuLabelProps,
  MenuMotion,
  MenuOpensOn,
  MenuOverlayProps,
  MenuPlacement,
  MenuProps,
  MenuSeparatorProps,
  MenuSlot,
  MenuTriggerProps,
} from './menu.type'
