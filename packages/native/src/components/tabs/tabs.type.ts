import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type TabsVariant = 'solid' | 'bordered' | 'light' | 'underlined'

export type TabsItem = {
  /**
   * Unique key for the tab.
   */
  key: string
  /**
   * Label content for the tab trigger.
   */
  title: ReactNode
  /**
   * Optional content displayed before the title.
   */
  startContent?: ReactNode
  /**
   * Optional content displayed after the title.
   */
  endContent?: ReactNode
  /**
   * Whether this tab is disabled.
   * @default false
   */
  isDisabled?: boolean
}

type TabsCustomAppearance = {
  /**
   * Custom styles for the outer container.
   */
  container?: ViewStyle
  /**
   * Custom styles for the tabs list wrapper.
   */
  list?: ViewStyle
  /**
   * Custom styles for each tab trigger.
   */
  tab?: ViewStyle
  /**
   * Custom styles for the selected tab trigger.
   */
  selectedTab?: ViewStyle
  /**
   * Custom styles for tab title text.
   */
  text?: TextStyle
  /**
   * Custom styles for selected tab title text.
   */
  selectedText?: TextStyle
  /**
   * Custom styles for the animated cursor.
   */
  cursor?: ViewStyle
  /**
   * Custom styles for optional content area.
   */
  content?: ViewStyle
}

type RenderTabState = {
  isSelected: boolean
  isDisabled: boolean
}

type RenderChildrenState = {
  selectedKey: string
  selectedItem?: TabsItem
}

export type TabsProps = {
  /**
   * Tabs items to render.
   */
  items: TabsItem[]
  /**
   * Controlled selected key.
   */
  selectedKey?: string
  /**
   * Default selected key in uncontrolled mode.
   */
  defaultSelectedKey?: string
  /**
   * Callback fired when selection changes.
   */
  onSelectionChange?: (key: string) => void
  /**
   * Keys that should be disabled.
   */
  disabledKeys?: string[]
  /**
   * Theme color of tabs.
   * @default 'primary'
   */
  color?: ThemeColor
  /**
   * Visual variant.
   * @default 'solid'
   */
  variant?: TabsVariant
  /**
   * Size of tab triggers.
   * @default 'md'
   */
  size?: Size
  /**
   * Border radius for list and cursor.
   * @default 'full'
   */
  radius?: Radius
  /**
   * Whether tabs should stretch to full width.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Whether all tabs are disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Disable cursor animation.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * Animation duration in milliseconds.
   * @default 220
   */
  animationDuration?: number
  /**
   * Optional custom tab renderer.
   */
  renderTab?: (item: TabsItem, state: RenderTabState) => ReactNode
  /**
   * Optional content area rendered below the tabs.
   * Accepts a render function to support fully custom behavior.
   */
  children?: ReactNode | ((state: RenderChildrenState) => ReactNode)
  /**
   * Custom appearance overrides.
   */
  customAppearance?: TabsCustomAppearance
}
