import type { ReactNode } from 'react'
import type { ViewStyle, GestureResponderEvent } from 'react-native'
import type { ThemeColor, Size } from '../../types'
import type { ButtonVariant, ButtonRadius } from './button.type'

export type IconButtonProps = {
  /**
   * Icon to display in the button
   */
  icon: ReactNode
  /**
   * Button size
   * @default 'md'
   */
  size?: Size
  /**
   * Button variant
   * @default 'solid'
   */
  variant?: ButtonVariant
  /**
   * Theme color
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Border radius
   * @default 'md'
   */
  radius?: ButtonRadius
  /**
   * Whether the button is disabled
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the button is loading
   * @default false
   */
  isLoading?: boolean
  /**
   * Custom appearance overrides
   */
  customAppearance?: {
    container?: ViewStyle
    button?: ViewStyle
  }
  /**
   * Press handler
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Long press handler
   */
  onLongPress?: (event: GestureResponderEvent) => void
  /**
   * Press in handler
   */
  onPressIn?: (event: GestureResponderEvent) => void
  /**
   * Press out handler
   */
  onPressOut?: (event: GestureResponderEvent) => void
}
