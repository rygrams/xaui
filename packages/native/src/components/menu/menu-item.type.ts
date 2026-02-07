import type { ReactNode } from 'react'
import type { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native'

export type MenuItemCustomAppearance = {
  /**
   * Custom styles for the item container
   */
  container?: ViewStyle
  /**
   * Custom styles for the item content
   */
  content?: ViewStyle
  /**
   * Custom styles for the title text
   */
  title?: TextStyle
}

export type MenuItemProps = {
  /**
   * Title text for the MenuItem.
   */
  title: ReactNode
  /**
   * Content to display at the start of the item.
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the item.
   */
  endContent?: ReactNode
  /**
   * Whether the item is disabled. A disabled item is greyed out and onPress is not called on touch.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Sets min height with densed layout.
   * @default false
   */
  dense?: boolean
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void
  /**
   * Custom appearance styles for item parts
   */
  customAppearance?: MenuItemCustomAppearance
  /**
   * Accessibility label for the item. This is read by the screen reader when the user taps the component.
   */
  accessibilityLabel?: string
}
