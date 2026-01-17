import type { TextStyle, ViewStyle } from 'react-native'

export type SwitchProps = {
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
  variant?: 'inside' | 'overlap'
  size?: 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  fullWidth?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  labelStyle?: TextStyle
  style?: ViewStyle
} & SwitchEvents

export type SwitchEvents = {
  onValueChange?: (isSelected: boolean) => void
}
