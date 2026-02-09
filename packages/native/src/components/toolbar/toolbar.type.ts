import type { ReactNode } from 'react'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type ToolbarVariant = 'floating' | 'docked' | 'vertical'
export type ToolbarPosition = 'top' | 'bottom' | 'left' | 'right'

export type ToolbarActionRenderParams = {
  color: string
  size: number
}

export type ToolbarActionProps = {
  /**
   * Icon element or icon render function.
   */
  icon: ReactNode | ((params: ToolbarActionRenderParams) => ReactNode)
  /**
   * Whether action is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom action style.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Callback fired when action is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when action is long-pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void
  /**
   * Accessibility label for action.
   */
  accessibilityLabel?: string
  /**
   * testID for e2e tests.
   */
  testID?: string
}

export type ToolbarCustomAppearance = {
  container?: StyleProp<ViewStyle>
  topRow?: StyleProp<ViewStyle>
  actionsContainer?: StyleProp<ViewStyle>
}

export type ToolbarProps = {
  /**
   * Toolbar variant.
   * - floating: rounded floating bar
   * - docked: fixed bar without rounding
   * - vertical: vertical bar (always centered)
   * @default 'docked'
   */
  variant?: ToolbarVariant
  /**
   * Toolbar position.
   * - For floating/docked: 'top' | 'bottom'
   * - For vertical: 'left' | 'right'
   * @default 'top'
   */
  position?: ToolbarPosition
  /**
   * Whether toolbar is visible (with animation).
   * @default true
   */
  isVisible?: boolean
  /**
   * Theme color used for accent and icon tint.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Whether to render a divider.
   * @default false
   */
  showDivider?: boolean
  /**
   * Whether to show elevation shadow. If not provided, uses variant default.
   */
  isElevated?: boolean
  /**
   * Toolbar action items.
   */
  children?: ReactNode
  /**
   * Custom container style.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Optional custom appearance styles.
   */
  customAppearance?: ToolbarCustomAppearance
}
