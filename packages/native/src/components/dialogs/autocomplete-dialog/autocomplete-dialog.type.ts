import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../../types'

export type TriggerLayout = {
  x: number
  y: number
  width: number
  height: number
}

export type AutocompleteDialogProps = {
  /**
   * Theme color for the checkmark icon
   */
  themeColor?: ThemeColor
  /**
   * Whether the dialog is visible
   */
  visible: boolean
  /**
   * The input value
   */
  inputValue: string
  /**
   * Placeholder text for the input
   */
  placeholder?: string
  /**
   * Dialog title
   */
  title?: string
  /**
   * Items to display in the scrollable list
   */
  children: ReactNode
  /**
   * Whether to show the checkmark button
   * @default true
   */
  showCheckmark?: boolean
  /**
   * Custom checkmark icon
   */
  checkmarkIcon?: ReactNode
  /**
   * Input text style
   */
  inputTextStyle?: StyleProp<TextStyle>
  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>
  /**
   * @private Internal prop for trigger layout animation
   */
  _triggerLayout?: TriggerLayout
  /**
   * Callback when input value changes
   */
  onInputChange?: (value: string) => void
  /**
   * Callback when dialog should close
   */
  onClose?: () => void
  /**
   * Callback when checkmark is pressed
   */
  onCheckmark?: () => void
  /**
   * Callback when input is focused
   */
  onFocus?: () => void
  /**
   * Callback when input is blurred
   */
  onBlur?: () => void
}
