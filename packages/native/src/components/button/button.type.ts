import { ReactNode } from 'react'
import type { TextStyle, ViewStyle, GestureResponderEvent } from 'react-native'
import type { Size, ThemeColor } from '../../types'

export type ButtonVariant = 'solid' | 'outlined' | 'flat' | 'light' | 'elevated' | 'faded'
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type SpinnerPlacement = 'start' | 'end'

export type ButtonProps = {
  /**
   * The content to display in the button.
   */
  children: ReactNode
  /**
   * The theme color of the button.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * The variant of the button.
   * @default 'solid'
   */
  variant?: ButtonVariant
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: Size
  /**
   * The border radius of the button.
   * @default 'md'
   */
  radius?: ButtonRadius
  /**
   * Content to display at the start of the button.
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the button.
   */
  endContent?: ReactNode
  /**
   * The placement of the spinner when isLoading is true.
   * @default 'start'
   */
  spinnerPlacement?: SpinnerPlacement
  /**
   * Whether the button should take the full width of its container.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Whether the button is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the button is in a loading state.
   * @default false
   */
  isLoading?: boolean
  /**
   * Custom text style for the button label.
   */
  textStyle?: TextStyle
  /**
   * Custom style for the button container.
   */
  style?: ViewStyle
  /**
   * Callback fired when the button is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when the button is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when the button press starts.
   */
  onPressIn?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when the button press ends.
   */
  onPressOut?: (event: GestureResponderEvent) => void
}
