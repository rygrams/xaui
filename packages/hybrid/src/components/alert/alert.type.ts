import type { CSSProperties, ReactNode } from 'react'
import type { ThemeColor } from '../../types'

export type AlertVariant = 'solid' | 'bordered' | 'flat' | 'faded'
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type AlertEvents = {
  onClose?: () => void
  onVisibleChange?: (isVisible: boolean) => void
}

type AlertCustomAppearance = {
  container?: CSSProperties
  title?: CSSProperties
  description?: CSSProperties
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
  customAppearance?: AlertCustomAppearance
  children?: ReactNode
  testID?: string
  className?: string
  style?: CSSProperties
} & AlertEvents
