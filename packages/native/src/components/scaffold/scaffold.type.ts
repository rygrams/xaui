import type { ReactNode } from 'react'
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import type { ThemeColor } from '../../types'

export type ScaffoldFabButtonProps = {
  /**
   * Icon element to render inside the FAB.
   * Color and size are injected automatically.
   */
  icon: ReactNode
  /**
   * Optional label that turns the FAB into an extended FAB.
   */
  label?: string
  /**
   * Size of the FAB.
   * @default 'regular'
   */
  size?: 'regular' | 'small'
  /**
   * Theme color for the FAB background.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Custom style for the FAB container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Called when the FAB is pressed.
   */
  onPress?: () => void
}

export type ScaffoldProps = {
  /**
   * Scaffold slot children. Place ScaffoldAppBar, ScaffoldBody,
   * ScaffoldFooter, and ScaffoldFabButton directly as children.
   * Any child that is not a recognised slot is ignored.
   */
  children?: ReactNode
  /**
   * Shows an indeterminate linear loader below the app bar.
   * @default false
   */
  isLoading?: boolean
  /**
   * Activates the pull-to-refresh indicator inside ScaffoldBody.
   * Requires onRefresh to be set.
   * @default false
   */
  isRefreshing?: boolean
  /**
   * Color used for the linear loader and refresh indicator.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Background color of the scaffold.
   */
  backgroundColor?: string
  /**
   * Custom style for the root container.
   */
  style?: StyleProp<ViewStyle>
} & ScaffoldEvents

export type ScaffoldEvents = {
  /**
   * Called when the user pulls to refresh.
   */
  onRefresh?: () => void
  /**
   * Called when the body is scrolled.
   */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export type ScaffoldBodyProps = {
  /**
   * Body content.
   */
  children?: ReactNode
  /**
   * Whether the body content is scrollable.
   * @default true
   */
  scrollable?: boolean
  /**
   * Whether to show the pull-to-refresh indicator.
   * @default false
   */
  isRefreshing?: boolean
  /**
   * Color used for the refresh indicator.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Style for the scroll/body container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style for the scroll content container.
   */
  contentContainerStyle?: StyleProp<ViewStyle>
} & Pick<ScaffoldEvents, 'onRefresh' | 'onScroll'>

export type ScaffoldFooterProps = {
  /**
   * Footer content.
   */
  children?: ReactNode
  /**
   * Custom style for the footer container.
   */
  style?: StyleProp<ViewStyle>
}

export type ScaffoldAppBarProps = {
  /**
   * AppBar content (use AppBarStartContent, AppBarContent, AppBarEndContent).
   */
  children?: ReactNode
  /**
   * AppBar variant.
   * @default 'docked'
   */
  variant?: 'docked' | 'floating'
  /**
   * Shadow elevation.
   * @default 0
   */
  elevation?: number
  /**
   * Theme color for the app bar surface.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Custom style for the app bar surface.
   */
  style?: StyleProp<ViewStyle>
  /**
   * When provided, renders a back button at the start of the app bar.
   */
  onBack?: () => void
}
