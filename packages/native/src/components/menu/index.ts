import { MenuContent } from './menu-content'
import { MenuGroup } from './menu-group'
import { MenuItem } from './menu-item'
import { MenuItemDescription } from './menu-item-description'
import { MenuItemIndicator } from './menu-item-indicator'
import { MenuItemTitle } from './menu-item-title'
import { MenuLabel } from './menu-label'
import { MenuOverlay } from './menu-overlay'
import { MenuTrigger } from './menu-trigger'
import { Menu as MenuRoot } from './menu'

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Overlay: MenuOverlay,
  Content: MenuContent,
  Label: MenuLabel,
  Group: MenuGroup,
  Item: MenuItem,
  ItemTitle: MenuItemTitle,
  ItemDescription: MenuItemDescription,
  ItemIndicator: MenuItemIndicator,
})

export { Menu as MenuRoot } from './menu'
export { MenuContent } from './menu-content'
export { MenuGroup } from './menu-group'
export { MenuItem } from './menu-item'
export { MenuItemDescription } from './menu-item-description'
export { MenuItemIndicator } from './menu-item-indicator'
export { MenuItemTitle } from './menu-item-title'
export { MenuLabel } from './menu-label'
export { MenuOverlay } from './menu-overlay'
export { MenuTrigger } from './menu-trigger'
export { useMenu, useMenuItem } from './menu.context'
export { menuRecipe } from './menu.recipe'
export type {
  MenuAlign,
  MenuAnchor,
  MenuContentProps,
  MenuContextValue,
  MenuGroupProps,
  MenuInsets,
  MenuItemContextValue,
  MenuItemDescriptionProps,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuItemRenderState,
  MenuItemTitleProps,
  MenuItemVariant,
  MenuLabelProps,
  MenuOverlayProps,
  MenuPlacement,
  MenuProps,
  MenuSlot,
  MenuTriggerProps,
  MenuWidth,
} from './menu.type'
