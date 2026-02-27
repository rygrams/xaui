import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../types'

export type InputTriggerVariant = 'colored' | 'light' | 'bordered' | 'underlined'
export type InputTriggerSize = 'sm' | 'md' | 'lg'
export type InputTriggerLabelPlacement = 'outside' | 'inside'

export type InputTriggerCustomAppearance = {
  container?: StyleProp<ViewStyle>
  inputContainer?: StyleProp<ViewStyle>
  inputWrapper?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
  content?: StyleProp<TextStyle>
  helperText?: StyleProp<TextStyle>
}

export type InputTriggerProps = {
  /**
   * Value displayed inside the trigger (acts as placeholder when no value).
   */
  value?: ReactNode
  /**
   * Placeholder text shown when no value is set.
   */
  placeholder?: string
  /**
   * Label displayed above or inside the trigger.
   */
  label?: ReactNode
  /**
   * Position of the label relative to the trigger.
   * @default 'outside'
   */
  labelPlacement?: InputTriggerLabelPlacement
  /**
   * Helper text displayed below the trigger.
   */
  description?: ReactNode
  /**
   * Error message displayed when isInvalid is true.
   */
  errorMessage?: ReactNode
  /**
   * Content rendered at the start of the trigger.
   */
  startContent?: ReactNode
  /**
   * Content rendered at the end of the trigger.
   */
  endContent?: ReactNode
  /**
   * Theme color for focus and active states.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Visual style variant.
   * @default 'colored'
   */
  variant?: InputTriggerVariant
  /**
   * Size of the trigger.
   * @default 'md'
   */
  size?: InputTriggerSize
  /**
   * Border radius of the trigger.
   * @default 'md'
   */
  radius?: Radius
  /**
   * Whether the trigger is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the trigger is in an invalid state.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Whether the component takes the full available width.
   * @default true
   */
  fullWidth?: boolean
  /**
   * Custom style overrides for trigger parts.
   */
  customAppearance?: InputTriggerCustomAppearance
} & InputTriggerEvents

export type InputTriggerEvents = {
  /**
   * Called when the trigger is pressed.
   */
  onPress?: () => void
}
