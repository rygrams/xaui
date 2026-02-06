import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../types'

export type BottomSheetSnapPoint = number | string

export type BottomSheetProps = {
  /**
   * Content to render inside the bottom sheet.
   */
  children: ReactNode
  /**
   * Whether the bottom sheet is visible.
   * @default false
   */
  isOpen: boolean
  /**
   * Snap points as fractions of screen height (0 to 1).
   * First value is the initial collapsed height, subsequent values are expanded heights.
   * @default [0.4, 0.9]
   */
  snapPoints?: [number, ...number[]]
  /**
   * Index of the initial snap point when the sheet opens.
   * @default 0
   */
  initialSnapIndex?: number
  /**
   * Theme color for the handle bar indicator.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Border radius of the top corners.
   * @default 'lg'
   */
  radius?: Radius
  /**
   * Whether to show the backdrop overlay.
   * @default true
   */
  showBackdrop?: boolean
  /**
   * Whether to close the sheet when tapping the backdrop.
   * @default true
   */
  closeOnBackdropPress?: boolean
  /**
   * Whether the sheet can be dismissed by swiping down.
   * @default true
   */
  enableSwipeToDismiss?: boolean
  /**
   * Whether to show the drag handle indicator.
   * @default true
   */
  showHandle?: boolean
  /**
   * Disable all animations.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * Custom style for the sheet container.
   */
  style?: ViewStyle
  /**
   * Custom content to render as the handle.
   */
  handleContent?: ReactNode
} & BottomSheetEvents

export type BottomSheetEvents = {
  /**
   * Called when the sheet is closed.
   */
  onClose?: () => void
  /**
   * Called when the snap point changes.
   */
  onSnapChange?: (index: number) => void
}
