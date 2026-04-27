import { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type AlertVariant = 'solid' | 'bordered' | 'flat' | 'faded'
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type AlertEvents = {
  onClose?: () => void
  onVisibleChange?: (isVisible: boolean) => void
}

export type AlertProps = {
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  themeColor?: ThemeColor
  variant?: AlertVariant
  radius?: AlertRadius
  isClosable?: boolean
  hideIcon?: boolean
  closeButton?: ReactNode
  isVisible?: boolean
  style?: ViewStyle
  titleStyle?: TextStyle
  descriptionStyle?: TextStyle
  children?: ReactNode
} & AlertEvents
