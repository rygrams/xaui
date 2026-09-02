import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type MenuPosition = 'top' | 'bottom'

export type MenuCustomAppearance = {
  /**
   * Custom styles for the overlay container
   */
  overlay?: ViewStyle
  /**
   * Custom styles for the menu container
   */
  container?: ViewStyle
  /**
   * Custom styles for the menu content
   */
  content?: ViewStyle
}

export type MenuProps = {
  /**
   * Whether the Menu is currently visible.
   */
  visible: boolean
  /**
   * The trigger element to open the menu from. This is the component that will trigger the menu display.
   */
  trigger: ReactNode
  /**
   * Whether the menu should open at the top of the trigger or at its bottom.
   * @default 'bottom'
   */
  position?: MenuPosition
  /**
   * Callback called when Menu is dismissed. The `visible` prop needs to be updated when this is called.
   */
  onDismiss?: () => void
  /**
   * Callback fired when a MenuItem with an `itemKey` is pressed.
   */
  onItemPress?: (itemKey: string) => void
  /**
   * Content of the Menu.
   */
  children: ReactNode
  /**
   * Custom appearance styles for menu parts
   */
  customAppearance?: MenuCustomAppearance
  /**
   * Maximum height of the scrollable menu content
   * @default 280
   */
  maxHeight?: number
}
