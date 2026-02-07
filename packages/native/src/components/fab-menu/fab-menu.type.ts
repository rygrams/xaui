import { ReactNode } from 'react'
import type { ViewStyle, GestureResponderEvent } from 'react-native'
import type { ThemeColor } from '../../types'
import type { FabVariant, FabSize } from '../fab/fab.type'
import type { ButtonRadius, ElevationLevel } from '../button/button.type'

export type FabMenuItemProps = {
  /**
   * The icon to display in the menu item.
   */
  icon: ReactNode
  /**
   * The text label for the menu item.
   */
  label: string
  /**
   * The theme color for the menu item chip.
   * Inherits from parent FabMenu themeColor if not specified.
   */
  themeColor?: ThemeColor
  /**
   * Callback fired when the menu item is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Whether the menu item is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * @internal Injected by FabMenu to close the menu on item press.
   */
  _onClose?: () => void
}

type FabMenuCustomAppearance = {
  /**
   * Custom styles for the outer container
   */
  container?: ViewStyle
  /**
   * Custom styles for the toggle FAB
   */
  fab?: ViewStyle
  /**
   * Custom styles for each menu item row
   */
  menuItem?: ViewStyle
  /**
   * Custom styles for the menu items container
   */
  menuContainer?: ViewStyle
  /**
   * Custom styles for the overlay/backdrop
   */
  overlay?: ViewStyle
}

export type FabMenuProps = {
  /**
   * The icon to display when the FAB menu is collapsed.
   */
  icon: ReactNode
  /**
   * Optional text label for the toggle FAB (extended FAB).
   */
  label?: ReactNode
  /**
   * The icon to display when the FAB menu is expanded.
   * Defaults to a close/X appearance if not provided.
   */
  expandedIcon?: ReactNode
  /**
   * FabMenuItem children to display when expanded.
   */
  children: ReactNode
  /**
   * The theme color of the toggle FAB.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * The visual variant of the toggle FAB.
   * @default 'solid'
   */
  variant?: FabVariant
  /**
   * The size of the toggle FAB.
   * @default 'md'
   */
  size?: FabSize
  /**
   * Custom border radius for the toggle FAB.
   * Overrides the default size-based border radius.
   */
  radius?: ButtonRadius
  /**
   * Android elevation level for the toggle FAB from 0 to 4.
   * Does not apply to `outlined` and `light` variants.
   * @default 0
   */
  elevation?: ElevationLevel
  /**
   * Whether the menu is expanded.
   * When provided, the component becomes controlled.
   */
  isExpanded?: boolean
  /**
   * Callback fired when the menu toggle state changes.
   */
  onToggle?: (expanded: boolean) => void
  /**
   * Whether to show an overlay/backdrop when expanded.
   * @default true
   */
  showOverlay?: boolean
  /**
   * Custom appearance styles for FAB menu parts.
   */
  customAppearance?: FabMenuCustomAppearance
}
