import type { ReactElement } from 'react'
import type { RefreshControlProps as RNRefreshControlProps } from 'react-native'
import type { ThemeColor } from '../../types'

type SupportedChildProps = {
  refreshControl?: ReactElement | null
}

export type PullToRefreshProps = {
  /**
   * Whether the refresh indicator is visible.
   */
  refreshing: boolean
  /**
   * Callback fired when user triggers pull-to-refresh.
   */
  onRefresh: () => void | Promise<void>
  /**
   * Whether pull-to-refresh is enabled.
   * @default true
   */
  enabled?: boolean
  /**
   * Theme color used for the refresh indicator.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Override indicator color.
   */
  color?: string
  /**
   * Title shown near the refresh indicator.
   */
  title?: string
  /**
   * Override title color.
   */
  titleColor?: string
  /**
   * Progress offset from top (Android).
   */
  progressViewOffset?: number
  /**
   * Scrollable child that accepts `refreshControl` prop.
   */
  children: ReactElement<SupportedChildProps>
  /**
   * Additional native refresh control props.
   */
  refreshControlProps?: Omit<
    RNRefreshControlProps,
    | 'refreshing'
    | 'onRefresh'
    | 'enabled'
    | 'colors'
    | 'tintColor'
    | 'title'
    | 'titleColor'
    | 'progressViewOffset'
  >
}
