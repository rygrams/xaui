import type { TextStyle, ViewStyle } from 'react-native'

export type CheckboxProps = {
  label?: string
  labelAlignment?: 'left' | 'right' | 'justify-left' | 'justify-right'
  themeColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'default'
  variant?: 'filled' | 'light'
  size?: 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  fullWidth?: boolean
  isChecked?: boolean
  isDisabled?: boolean
  labelStyle?: TextStyle
  style?: ViewStyle
} & CheckboxEvents

export type CheckboxEvents = {
  onValueChange?: (isChecked: boolean) => void
}
