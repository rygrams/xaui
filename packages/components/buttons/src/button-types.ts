import { ReactNode } from 'react'
import type { TextStyle, ViewStyle, GestureResponderEvent } from 'react-native'

export enum ButtonVariant {
  Solid = 'solid',
  Outlined = 'outlined',
  Flat = 'flat',
  Light = 'light',
  Elevated = 'elevated',
  Faded = 'faded',
}

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
  variant?: ButtonVariant
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
