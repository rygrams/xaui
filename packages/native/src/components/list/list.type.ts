import type { ReactNode } from 'react'
import type { ViewStyle, TextStyle, GestureResponderEvent } from 'react-native'
import type { Size, ThemeColor } from '../../types'
import React from 'react'

export type ListSelectionMode = 'single' | 'multiple' | 'none'

export type ListItemCustomAppearance = {
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

export type ListItemProps = {
  /**
   * Unique key for the item (used for selection)
   */
  itemKey: string
  /**
   * Title text for the ListItem
   */
  title: ReactNode
  /**
   * Optional description text
   */
  description?: ReactNode
  /**
   * Content to display at the start of the item
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the item
   */
  endContent?: ReactNode
  /**
   * Whether the item is disabled
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the item is selected
   * @default false
   */
  isSelected?: boolean
  /**
   * Custom appearance styles for item parts
   */
  customAppearance?: ListItemCustomAppearance
  /**
   * Callback fired when the item is pressed
   */
  onPress?: (event: GestureResponderEvent) => void
}

export type ListProps = {
  /**
   * List items
   */
  children: ReactNode
  /**
   * Selection mode for the list
   * @default 'none'
   */
  selectionMode?: ListSelectionMode
  /**
   * Controlled selected keys
   */
  selectedKeys?: string[]
  /**
   * Default selected keys (uncontrolled)
   */
  defaultSelectedKeys?: string[]
  /**
   * Whether to show dividers between items
   * @default false
   */
  showDivider?: boolean
  /**
   * Whether items are pressable
   * @default true
   */
  isPressable?: boolean
  /**
   * Whether items are selectable
   * @default false
   */
  isSelectable?: boolean
  /**
   * Theme color for selected items
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Size of the list items
   * @default 'md'
   */
  size?: Size
  /**
   * Callback fired when selection changes
   */
  onSelectionChange?: (keys: string[]) => void
  /**
   * Custom styles for the list container
   */
  style?: ViewStyle
}

export type ListBuilderProps<T> = {
  /**
   * Data array to render
   */
  data: T[]
  /**
   * Function to extract unique key from item
   */
  keyExtractor: (item: T, index: number) => string
  /**
   * Function to render each item
   */
  renderItem: (item: T, index: number) => ReactNode
  /**
   * Selection mode for the list
   * @default 'none'
   */
  selectionMode?: ListSelectionMode
  /**
   * Controlled selected keys
   */
  selectedKeys?: string[]
  /**
   * Default selected keys (uncontrolled)
   */
  defaultSelectedKeys?: string[]
  /**
   * Whether to show dividers between items
   * @default false
   */
  showDivider?: boolean
  /**
   * Whether items are pressable
   * @default true
   */
  isPressable?: boolean
  /**
   * Whether items are selectable
   * @default false
   */
  isSelectable?: boolean
  /**
   * Theme color for selected items
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Size of the list items
   * @default 'md'
   */
  size?: Size
  /**
   * Callback fired when selection changes
   */
  onSelectionChange?: (keys: string[]) => void
  /**
   * Custom styles for the list container
   */
  style?: ViewStyle
  /**
   * FlatList props to pass through
   */
  flatListProps?: Omit<
    React.ComponentProps<typeof import('react-native').FlatList<T>>,
    'data' | 'renderItem' | 'keyExtractor'
  >
}
