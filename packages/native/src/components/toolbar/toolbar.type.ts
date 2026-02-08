import type { ReactNode } from 'react'
import type {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { ThemeColor } from '../../types'

export type ToolbarVariant = 'small' | 'centered' | 'medium' | 'large'
export type ToolbarPosition = 'relative' | 'absolute-top' | 'absolute-bottom'

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
  headlineContainer?: StyleProp<ViewStyle>
  title?: StyleProp<TextStyle>
  subtitle?: StyleProp<TextStyle>
  navigationButton?: StyleProp<ViewStyle>
  actionsContainer?: StyleProp<ViewStyle>
}

export type ToolbarProps = {
  /**
   * Main toolbar title.
   */
  title: ReactNode
  /**
   * Optional subtitle displayed under title in medium/large variants.
   */
  subtitle?: ReactNode
  /**
   * Toolbar variant.
   * @default 'small'
   */
  variant?: ToolbarVariant
  /**
   * Toolbar position strategy.
   * @default 'relative'
   */
  position?: ToolbarPosition
  /**
   * Whether toolbar is visible.
   * @default true
   */
  isVisible?: boolean
  /**
   * Theme color used for accent and icon tint.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Optional leading icon.
   */
  navigationIcon?: ReactNode
  /**
   * Callback fired when leading icon is pressed.
   */
  onNavigationPress?: (event: GestureResponderEvent) => void
  /**
   * Accessibility label for leading icon.
   */
  navigationAccessibilityLabel?: string
  /**
   * Whether to render a bottom divider.
   * @default true
   */
  showDivider?: boolean
  /**
   * Whether to show elevation shadow.
   * @default false
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
