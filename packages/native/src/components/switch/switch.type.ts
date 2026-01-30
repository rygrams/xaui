import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type SwitchVariant = 'inside' | 'overlap'
export type SwitchSize = 'sm' | 'md' | 'lg'
export type SwitchRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type SwitchLabelAlignment = 'left' | 'right' | 'justify-left' | 'justify-right'

export type SwitchEvents = {
  onValueChange?: (isSelected: boolean) => void
}

export type SwitchProps = {
  label?: string
  labelAlignment?: SwitchLabelAlignment
  themeColor?: ThemeColor
  variant?: SwitchVariant
  size?: SwitchSize
  radius?: SwitchRadius
  fullWidth?: boolean
  isSelected?: boolean
  isDisabled?: boolean
  labelStyle?: TextStyle
  style?: ViewStyle
} & SwitchEvents
