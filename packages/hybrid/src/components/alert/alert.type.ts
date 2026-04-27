import type { CSSProperties, ReactNode } from 'react'
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
  /** Border radius — number in pixels (e.g. `8`) or any CSS value (e.g. `"50%"`). Defaults to `8`. */
  radius?: number | string
  /** Whether to display a close button. */
  isClosable?: boolean
  /** Hide the leading icon. */
  hideIcon?: boolean
  /** Custom element rendered as the close button. */
  closeButton?: ReactNode
  /** Controls visibility externally (controlled mode). */
  isVisible?: boolean
  /** Override styles for the title text. */
  titleStyle?: CSSProperties
  /** Override styles for the description text. */
  descriptionStyle?: CSSProperties
  /** Additional content rendered below the description. */
  children?: ReactNode
  /** Test identifier for automated testing. */
  testID?: string
  /** Override styles for the container. */
  style?: CSSProperties
} & AlertEvents
