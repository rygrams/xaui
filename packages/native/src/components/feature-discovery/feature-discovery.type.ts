import type { ReactNode, RefObject } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

type MeasurableNode = {
  measureInWindow: (
    callback: (x: number, y: number, width: number, height: number) => void
  ) => void
}

export type FeatureDiscoveryCustomAppearance = {
  container?: ViewStyle
  title?: TextStyle
  description?: TextStyle
  actionText?: TextStyle
  highlightContainer?: ViewStyle
  messageContainer?: ViewStyle
}

export type FeatureDiscoveryProps = {
  /**
   * Whether the discovery overlay is visible.
   */
  isVisible: boolean
  /**
   * Ref to the target element to highlight.
   */
  targetRef: RefObject<MeasurableNode | null>
  /**
   * Discovery title.
   */
  title: ReactNode
  /**
   * Optional discovery description.
   */
  description?: ReactNode
  /**
   * Optional action label displayed under the text.
   */
  actionText?: ReactNode
  /**
   * Called when action text is pressed.
   */
  onActionPress?: () => void
  /**
   * Called when overlay should close.
   */
  onDismiss?: () => void
  /**
   * Whether tapping outside dismisses the overlay.
   * @default true
   */
  dismissOnBackdropPress?: boolean
  /**
   * Accent color for the discovery circle.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Backdrop color.
   */
  overlayColor?: string
  /**
   * Extra spacing around target highlight.
   * @default 14
   */
  spotlightPadding?: number
  /**
   * Scale multiplier for discovery circle diameter.
   * @default 1.65
   */
  circleScale?: number
  /**
   * Optional custom content rendered over the highlighted target.
   */
  highlightContent?: ReactNode
  /**
   * Custom style for the root container.
   */
  style?: ViewStyle
  /**
   * Optional style overrides.
   */
  customAppearance?: FeatureDiscoveryCustomAppearance
}
