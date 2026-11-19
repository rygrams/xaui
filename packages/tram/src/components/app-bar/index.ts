import { AppBarRoot } from './app-bar'
import { AppBarButton } from './app-bar-button'
import { AppBarIcon } from './app-bar-icon'
import { AppBarLabel } from './app-bar-label'
import { AppBarMenu } from './app-bar-menu'
import { AppBarMenuItem } from './app-bar-menu-item'

export const AppBar = Object.assign(AppBarRoot, {
  Button: AppBarButton,
  Icon: AppBarIcon,
  Label: AppBarLabel,
  Menu: AppBarMenu,
  MenuItem: AppBarMenuItem,
})

export { useAppBar, useAppBarButton } from './app-bar.context'
export { appBarRecipe } from './app-bar.recipe'
export type {
  AppBarButtonContextValue,
  AppBarButtonProps,
  AppBarContextValue,
  AppBarIconProps,
  AppBarLabelProps,
  AppBarMenuItemProps,
  AppBarMenuProps,
  AppBarMode,
  AppBarPlacement,
  AppBarProps,
  AppBarSize,
  AppBarSlot,
} from './app-bar.type'
