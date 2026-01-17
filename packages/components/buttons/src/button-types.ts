import { ReactNode } from 'react'
import type { TextStyle, ViewStyle, GestureResponderEvent } from 'react-native'

export type ButtonProps = {
  children: ReactNode
  themeColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'default'
  variant?: 'solid' | 'outlined' | 'flat' | 'light' | 'elevated' | 'faded'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  startContent?: ReactNode
  endContent?: ReactNode
  spinnerType?: 'ticks' | 'bullets' | 'spinner'
  spinnerPlacement?: 'start' | 'end'
  fullWidth?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  enableRipple?: boolean
  textStyle?: TextStyle
  style?: ViewStyle
} & ButtonEvents

export type ButtonEvents = {
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: (event: GestureResponderEvent) => void
  onPressIn?: (event: GestureResponderEvent) => void
  onPressOut?: (event: GestureResponderEvent) => void
}
