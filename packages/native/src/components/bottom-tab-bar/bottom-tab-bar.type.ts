import type { ReactNode } from 'react'
import type {
  GestureResponderEvent,
  Insets,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { ThemeColor } from '../../types'

export type BottomTabBarSize = 'sm' | 'md' | 'lg'

export type BottomTabBarIconRenderParams = {
  focused: boolean
  color: string
  size: number
}

export type BottomTabBarItemLabelRenderParams = {
  focused: boolean
  color: string
  children: string
  position: 'below-icon'
}

export type BottomTabBarItemCustomAppearance = {
  container?: StyleProp<ViewStyle>
  indicator?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
}

export type BottomTabBarItemProps = {
  /**
   * Unique key for this tab item.
   */
  itemKey: string
  /**
   * Label shown under icon.
   */
  label: ReactNode
  /**
   * Icon content or icon render function.
   */
  icon?: ReactNode | ((params: BottomTabBarIconRenderParams) => ReactNode)
  /**
   * Optional icon when selected.
   */
  activeIcon?: ReactNode | ((params: BottomTabBarIconRenderParams) => ReactNode)
  /**
   * Optional badge shown near icon.
   */
  badge?: ReactNode
  /**
   * Whether this item is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Controlled selected state (standalone mode).
   */
  isSelected?: boolean
  /**
   * Whether to show label.
   */
  showLabel?: boolean
  /**
   * Per-item active color override.
   */
  activeColor?: string
  /**
   * Per-item inactive color override.
   */
  inactiveColor?: string
  /**
   * Per-item active indicator color override.
   */
  indicatorColor?: string
  /**
   * Custom style for item.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom appearance styles.
   */
  customAppearance?: BottomTabBarItemCustomAppearance
  /**
   * Callback fired when item is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when item is long-pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void
  /**
   * Accessibility label.
   */
  accessibilityLabel?: string
  /**
   * testID for e2e tests.
   */
  testID?: string
}

export type ExpoRouterTabRoute = {
  key: string
  name: string
  params?: Record<string, unknown>
}

export type ExpoRouterTabState = {
  index: number
  routes: ExpoRouterTabRoute[]
}

export type ExpoRouterTabDescriptorOptions = {
  title?: string
  tabBarLabel?:
    | string
    | ((props: BottomTabBarItemLabelRenderParams) => ReactNode)
  tabBarIcon?: (props: BottomTabBarIconRenderParams) => ReactNode
  tabBarActiveTintColor?: string
  tabBarInactiveTintColor?: string
  tabBarBadge?: ReactNode
  tabBarShowLabel?: boolean
  tabBarButtonTestID?: string
  tabBarAccessibilityLabel?: string
  tabBarItemStyle?: StyleProp<ViewStyle>
  tabBarStyle?: StyleProp<ViewStyle>
  href?: string | null
}

export type ExpoRouterTabDescriptor = {
  options: ExpoRouterTabDescriptorOptions
}

export type ExpoRouterTabDescriptors = Record<string, ExpoRouterTabDescriptor>

export type ExpoRouterTabNavigation = {
  emit: (options: {
    type: 'tabPress' | 'tabLongPress'
    target?: string
    canPreventDefault?: boolean
  }) => { defaultPrevented?: boolean }
  navigate: (name: string, params?: Record<string, unknown>) => void
}

export type ExpoRouterBottomTabBarCompatibleProps = {
  state: ExpoRouterTabState
  descriptors: ExpoRouterTabDescriptors
  navigation: ExpoRouterTabNavigation
  insets?: Partial<Insets>
}

type BottomTabBarBaseProps = {
  /**
   * Shared theme color.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Bar size.
   * @default 'md'
   */
  size?: BottomTabBarSize
  /**
   * Whether all items are disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether labels are shown by default.
   * @default true
   */
  showLabel?: boolean
  /**
   * Safe area bottom inset (manual mode). In expo-router mode this comes from `insets.bottom`.
   */
  insetBottom?: number
  /**
   * Active indicator color override.
   */
  indicatorColor?: string
  /**
   * Active icon/label color override.
   */
  activeColor?: string
  /**
   * Inactive icon/label color override.
   */
  inactiveColor?: string
  /**
   * Bar container style.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom appearance styles.
   */
  customAppearance?: {
    container?: StyleProp<ViewStyle>
  }
}

export type BottomTabBarComposableProps = BottomTabBarBaseProps & {
  children: ReactNode
  /**
   * Controlled selected item key.
   */
  selectedKey?: string
  /**
   * Uncontrolled default selected item key.
   */
  defaultSelectedKey?: string
  /**
   * Callback fired when selected item changes.
   */
  onSelectionChange?: (key: string) => void
}

export type BottomTabBarProps =
  | BottomTabBarComposableProps
  | (BottomTabBarBaseProps & ExpoRouterBottomTabBarCompatibleProps)
