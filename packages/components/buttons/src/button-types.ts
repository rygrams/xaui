import { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'

export type ButtonProps = {
  children: ReactNode
  color?:
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
  spinnerType?: 'dots' | 'circular' | 'activity'
  spinnerPlacement?: 'start' | 'end'
  fullWidth?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  disableRipple?: boolean
  textStyle?: TextStyle
  style?: ViewStyle
} & ButtonEvents

export type ButtonEvents = {
  onPress?: () => void
  onLongPress?: () => void
  onPressIn?: () => void
  onPressOut?: () => void
}
