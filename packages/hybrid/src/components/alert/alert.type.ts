import type { ReactNode, CSSProperties } from 'react'
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
  /**
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * @default 'flat'
   */
  variant?: AlertVariant
  /**
   * @default 'md'
   */
  radius?: AlertRadius
  /**
   * @default false
   */
  isClosable?: boolean
  /**
   * @default false
   */
  hideIcon?: boolean
  closeButton?: ReactNode
  /**
   * @default true
   */
  isVisible?: boolean
  customAppearance?: AlertCustomAppearance
  children?: ReactNode
} & AlertEvents
