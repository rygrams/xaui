import { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type AlertVariant = 'solid' | 'bordered' | 'flat' | 'faded'
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type AlertEvents = {
  /**
   * Callback fired when the alert is closed.
   */
  onClose?: () => void
  /**
   * Callback fired when the alert visibility changes.
   */
  onVisibleChange?: (isVisible: boolean) => void
}

export type AlertProps = {
  /**
   * The title of the alert.
   */
  title?: ReactNode
  /**
   * The description content of the alert.
   */
  description?: ReactNode
  /**
   * Custom icon to display inside the alert.
   */
  icon?: ReactNode
  /**
   * The theme color of the alert.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * The variant of the alert.
   * @default 'flat'
   */
  variant?: AlertVariant
  /**
   * The border radius of the alert.
   * @default 'md'
   */
  radius?: AlertRadius
  /**
   * Whether the alert can be closed with a close button.
   * @default false
   */
  isClosable?: boolean
  /**
   * Whether to hide the icon.
   * @default false
   */
  hideIcon?: boolean
  /**
   * Custom close button element.
   */
  closeButton?: ReactNode
  /**
   * Whether the alert is visible.
   * @default true
   */
  isVisible?: boolean
  /**
   * Custom style for the alert container.
   */
  style?: ViewStyle
  /**
   * Custom style for the alert title.
   */
  titleStyle?: TextStyle
  /**
   * Custom style for the alert description.
   */
  descriptionStyle?: TextStyle
  /**
   * Additional content rendered below the description.
   */
  children?: ReactNode
} & AlertEvents
