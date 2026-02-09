import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type DrawerPosition = 'top' | 'left' | 'bottom' | 'right'

export type DrawerProps = {
  /**
   * Content to render inside the drawer.
   */
  children: ReactNode
  /**
   * Whether the drawer is visible.
   * @default false
   */
  isOpen: boolean
  /**
   * Position of the drawer.
   * @default 'left'
   */
  position?: DrawerPosition
  /**
   * The theme color of the drawer.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Width of the drawer (for left/right position).
   * @default 280
   */
  width?: number
  /**
   * Height of the drawer (for top/bottom position).
   * @default 280
   */
  height?: number
  /**
   * Whether to show overlay backdrop.
   * @default true
   */
  showOverlay?: boolean
  /**
   * Callback fired when drawer should close (overlay tap or back button).
   */
  onClose?: () => void
  /**
   * Custom styles for the drawer container.
   */
  customStyle?: ViewStyle
  /**
   * Disable slide animation.
   * @default false
   */
  disableAnimation?: boolean
}
