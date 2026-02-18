import type { ReactNode } from 'react'
import type { ModalProps, TextStyle, ViewStyle } from 'react-native'
import type { Radius } from '../../types'

export type DialogSize = 'sm' | 'md' | 'lg' | 'full'
export type DialogPlacement = 'top' | 'center' | 'bottom'
export type DialogBackdrop = 'transparent' | 'blurred' | 'opaque'

type DialogCustomAppearance = {
  /**
   * Custom style for the overlay backdrop.
   */
  backdrop?: ViewStyle
  /**
   * Custom style for the dialog container.
   */
  container?: ViewStyle
  /**
   * Custom style for the dialog header section.
   */
  header?: ViewStyle
  /**
   * Custom style for the dialog body section.
   */
  body?: ViewStyle
  /**
   * Custom style for the dialog footer section.
   */
  footer?: ViewStyle
  /**
   * Custom style for the close button.
   */
  closeButton?: ViewStyle
  /**
   * Custom style for default title text rendered in DialogHeader.
   */
  headerText?: TextStyle
  /**
   * Custom style for default body text rendered in DialogBody.
   */
  bodyText?: TextStyle
}

export type DialogEvents = {
  /**
   * Called when the dialog requests to close.
   */
  onClose?: () => void
  /**
   * Called whenever open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void
}

export type DialogProps = {
  /**
   * Dialog content.
   */
  children: ReactNode
  /**
   * Controls visibility.
   * @default false
   */
  isOpen: boolean
  /**
   * Dialog size preset.
   * @default 'md'
   */
  size?: DialogSize
  /**
   * Dialog placement on screen.
   * @default 'center'
   */
  placement?: DialogPlacement
  /**
   * Border radius of the dialog container.
   * @default 'lg'
   */
  radius?: Radius
  /**
   * Controls backdrop intensity.
   * @default 'opaque'
   */
  backdrop?: DialogBackdrop
  /**
   * If true, backdrop press closes the dialog.
   * @default true
   */
  closeOnBackdropPress?: boolean
  /**
   * Whether to hide the backdrop layer.
   * @default false
   */
  hideBackdrop?: boolean
  /**
   * Modal animation type.
   * @default 'fade'
   */
  animationType?: ModalProps['animationType']
  /**
   * Disable animation by forcing `animationType="none"`.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * Extra style for the dialog container.
   */
  style?: ViewStyle
  /**
   * Custom styles per section.
   */
  customAppearance?: DialogCustomAppearance
} & DialogEvents

export type DialogHeaderProps = {
  children?: ReactNode
  /**
   * Whether to show a close button in header.
   * @default false
   */
  isClosable?: boolean
  /**
   * Custom close button element.
   */
  closeButton?: ReactNode
  /**
   * Optional close callback override for this header.
   */
  onClose?: () => void
  /**
   * Custom style for header container.
   */
  style?: ViewStyle
}

export type DialogBodyProps = {
  children?: ReactNode
  /**
   * Custom style for body container.
   */
  style?: ViewStyle
}

export type DialogFooterProps = {
  children?: ReactNode
  /**
   * Custom style for footer container.
   */
  style?: ViewStyle
}

