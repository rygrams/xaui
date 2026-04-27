import { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

/** Visual style of the alert container. */
export type AlertVariant = 'solid' | 'bordered' | 'flat' | 'faded' | 'glass'

export type AlertEvents = {
  /** Called when the alert finishes closing. */
  onClose?: () => void
  /** Called whenever the visibility state changes. */
  onVisibleChange?: (isVisible: boolean) => void
}

export type AlertProps = {
  /** Main heading displayed inside the alert. */
  title?: ReactNode
  /** Supporting text below the title. */
  description?: ReactNode
  /** Custom icon element — overrides the default theme icon. */
  icon?: ReactNode
  /** Color scheme applied to the alert. Defaults to `'default'`. */
  themeColor?: ThemeColor
  /** Visual style variant. Defaults to `'flat'`. */
  variant?: AlertVariant
  /** Border radius in pixels. Defaults to `8`. */
  radius?: number
  /** Whether to display a close button. */
  isClosable?: boolean
  /** Hide the leading icon. */
  hideIcon?: boolean
  /** Custom element rendered as the close button. */
  closeButton?: ReactNode
  /** Controls visibility externally (controlled mode). */
  isVisible?: boolean
  /** Override styles for the container. */
  style?: ViewStyle
  /** Override styles for the title text. */
  titleStyle?: TextStyle
  /** Override styles for the description text. */
  descriptionStyle?: TextStyle
  /** Additional content rendered below the description. */
  children?: ReactNode
} & AlertEvents
