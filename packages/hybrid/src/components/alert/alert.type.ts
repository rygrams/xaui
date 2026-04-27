import type { CSSProperties, ReactNode } from 'react'
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
  titleStyle?: CSSProperties
  descriptionStyle?: CSSProperties
  children?: ReactNode
  testID?: string
  style?: CSSProperties
} & AlertEvents
