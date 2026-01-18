import { ReactElement } from 'react'
import type { ViewStyle, GestureResponderEvent } from 'react-native'

export enum IconButtonVariant {
  Solid = 'solid',
  Outlined = 'outlined',
  Flat = 'flat',
  Light = 'light',
  Faded = 'faded',
}

export type IconButtonProps = {
  icon: ReactElement
  themeColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'warning'
    | 'success'
    | 'default'
  variant?: IconButtonVariant
  size?: 'xs' | 'sm' | 'md' | 'lg'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  fullWidth?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  enableRipple?: boolean
  style?: ViewStyle
} & IconButtonEvents

export type IconButtonEvents = {
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: (event: GestureResponderEvent) => void
  onPressIn?: (event: GestureResponderEvent) => void
  onPressOut?: (event: GestureResponderEvent) => void
}
