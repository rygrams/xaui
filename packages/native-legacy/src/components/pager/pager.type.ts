import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type PagerIndicatorRenderState = {
  index: number
  isActive: boolean
  total: number
}

type PagerCustomAppearance = {
  /**
   * Custom styles for the outer wrapper.
   */
  container?: ViewStyle
  /**
   * Custom styles for the internal scroll view.
   */
  scrollView?: ViewStyle
  /**
   * Custom styles applied to each page wrapper.
   */
  page?: ViewStyle
  /**
   * Custom styles for the indicator row.
   */
  indicatorContainer?: ViewStyle
  /**
   * Custom styles for each indicator item.
   */
  indicator?: ViewStyle
  /**
   * Custom styles for the active indicator item.
   */
  activeIndicator?: ViewStyle
}

export type PagerProps = {
  /**
   * Whether the pager should fill its parent and render indicators inside.
   * @default false
   */
  isFullscreen?: boolean
  /**
   * Alias of `isFullscreen`.
   * @default false
   */
  isfullscreen?: boolean
  /**
   * Controlled active page index.
   */
  page?: number
  /**
   * Default active page index (uncontrolled mode).
   * @default 0
   */
  defaultPage?: number
  /**
   * Callback fired when active page changes.
   */
  onPageChange?: (page: number) => void
  /**
   * Whether swipe gesture is enabled.
   * @default true
   */
  swipeEnabled?: boolean
  /**
   * Whether to render indicators.
   * @default true
   */
  showIndicator?: boolean
  /**
   * Optional custom indicator renderer.
   */
  renderIndicator?: (state: PagerIndicatorRenderState) => ReactNode
  /**
   * Pager pages. Prefer using `PagerItem`.
   */
  children: ReactNode
  /**
   * Appearance overrides.
   */
  customAppearance?: PagerCustomAppearance
}

export type PagerItemProps = {
  /**
   * Page content.
   */
  children?: ReactNode
}
