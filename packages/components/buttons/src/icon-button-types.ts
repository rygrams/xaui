import { ReactElement } from 'react'
import type { ViewStyle, GestureResponderEvent } from 'react-native'

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
  variant?: 'solid' | 'outlined' | 'flat' | 'light' | 'faded'
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
