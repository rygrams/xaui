import type { ReactNode } from 'react'
import type { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native'
import type { Size, ThemeColor, Radius } from '../../types'

export type MenuBoxItemCustomAppearance = {
  /**
   * Custom styles for the item container
   */
  container?: ViewStyle
  /**
   * Custom styles for the content container
   */
  content?: ViewStyle
  /**
   * Custom styles for the title text
   */
  title?: TextStyle
  /**
   * Custom styles for the description text
   */
  description?: TextStyle
}

export type MenuBoxItemProps = {
  /**
   * Unique key for the item
   */
  itemKey: string
  /**
   * Title text for the MenuBoxItem
   */
  title: ReactNode
  /**
   * Optional description text
   */
  description?: ReactNode
  /**
   * Content to display at the start of the item (icon, avatar, etc.)
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the item (chevron, badge, etc.)
   */
  endContent?: ReactNode
  /**
   * Whether the item is disabled
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom appearance styles for item parts
   */
  customAppearance?: MenuBoxItemCustomAppearance
  /**
   * Callback fired when the item is pressed
   */
  onPress?: (event: GestureResponderEvent) => void
}

export type MenuBoxProps = {
  /**
   * MenuBox items (MenuBoxItem components)
   */
  children: ReactNode
  /**
   * Size of the menu items
   * @default 'md'
   */
  size?: Size
  /**
   * Border radius for the container and items
   * @default 'lg'
   */
  radius?: Radius
  /**
   * Theme color for pressed states
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Spacing between menu items in pixels
   * @default 0
   */
  spacing?: number
  /**
   * Custom styles for the container
   */
  style?: ViewStyle
  /**
   * Background color for MenuBox items
   * Uses `theme.colors.default.container` by default
   */
  backgroundColor?: string
}
