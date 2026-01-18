import type { TextStyle, ViewStyle } from 'react-native'

export enum SwitchVariant {
  Inside = 'inside',
  Overlap = 'overlap',
}

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
  variant?: SwitchVariant
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
