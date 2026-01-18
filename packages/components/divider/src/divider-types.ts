import type { ViewStyle } from 'react-native'

export type ThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'default'

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical'
  thickness?: number
  length?: number | string
  indent?: number
  endIndent?: number
  themeColor?: ThemeColor
  color?: string
  style?: ViewStyle
}
