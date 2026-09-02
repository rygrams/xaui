import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type SnackbarPosition = 'top' | 'bottom'

type SnackbarCustomAppearance = {
  /**
   * Custom style for the snackbar surface.
   */
  container?: ViewStyle
  /**
   * Custom style for the message text.
   */
  message?: TextStyle
  /**
   * Custom style for the action label text.
   */
  action?: TextStyle
  /**
   * Custom style for the close affordance button.
   */
  closeButton?: ViewStyle
}

type SnackbarBaseProps = {
  /**
   * Message content shown inside the snackbar.
   */
  message: ReactNode
  /**
   * Action content displayed at the end of the snackbar.
   */
  actionLabel?: ReactNode
  /**
   * Callback fired when the action is pressed.
   */
  onActionPress?: () => void
  /**
   * If true, pressing the action also dismisses the snackbar.
   * @default true
   */
  closeOnActionPress?: boolean
  /**
   * If true, shows the close affordance icon button.
   * @default false
   */
  showCloseAffordance?: boolean
  /**
   * Theme color for the snackbar. The default uses Material 3 inverse surface styling.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Number of lines for the message text.
   * @default 2
   */
  numberOfLines?: number
  /**
   * Custom appearance styles for snackbar parts.
   */
  customAppearance?: SnackbarCustomAppearance
}

export type SnackbarProps = SnackbarBaseProps & {
  /**
   * Controls snackbar visibility. If omitted, snackbar is shown by default.
   * @default true
   */
  isVisible?: boolean
  /**
   * Duration in milliseconds before auto-dismiss. Set to 0 or a negative value to disable.
   * @default 4000
   */
  duration?: number
  /**
   * Callback fired when the snackbar is dismissed.
   */
  onClose?: () => void
  /**
   * Callback fired when visibility changes.
   */
  onVisibleChange?: (isVisible: boolean) => void
  /**
   * Position of the snackbar on screen.
   * @default 'bottom'
   */
  position?: SnackbarPosition
  /**
   * Horizontal inset from screen edges.
   * @default 16
   */
  insetHorizontal?: number
  /**
   * Vertical inset from screen edge according to position.
   * @default 16
   */
  insetVertical?: number
  /**
   * Maximum width of the snackbar surface.
   * @default 640
   */
  maxWidth?: number
  /**
   * Render snackbar in a portal overlay.
   * @default true
   */
  usePortal?: boolean
}

export type SnackbarItem = SnackbarBaseProps & {
  /**
   * Unique identifier for the snackbar item in the stack.
   */
  id: string
  /**
   * Item-specific auto-dismiss duration in milliseconds.
   * Set to 0 or a negative value to disable.
   */
  duration?: number
}

export type SnackbarStackProps = {
  /**
   * Snackbar items to render in a vertical stack.
   */
  items: SnackbarItem[]
  /**
   * Called when an item requests dismissal.
   */
  onDismiss?: (id: string) => void
  /**
   * Position of the stacked snackbars on screen.
   * @default 'bottom'
   */
  position?: SnackbarPosition
  /**
   * Space between stacked snackbars.
   * @default 8
   */
  spacing?: number
  /**
   * Horizontal inset from screen edges.
   * @default 16
   */
  insetHorizontal?: number
  /**
   * Vertical inset from screen edge according to position.
   * @default 16
   */
  insetVertical?: number
  /**
   * Maximum width of each snackbar surface.
   * @default 640
   */
  maxWidth?: number
  /**
   * Default auto-dismiss duration for items without `duration`.
   * @default 4000
   */
  defaultDuration?: number
  /**
   * Render stack in a portal overlay.
   * @default true
   */
  usePortal?: boolean
  /**
   * Custom styles for stack containers.
   */
  customAppearance?: {
    container?: ViewStyle
    content?: ViewStyle
  }
}
