import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'

export type DialogSlot = 'overlay' | 'panel' | 'content' | 'title' | 'description'

type DialogOwnProps = {
  children?: ReactNode
  radius?: RadiusKey
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  isDisabled?: boolean
}

/** The root renders **no node** — `ref` and `style` live on the parts that draw. */
export type DialogProps = DialogOwnProps

type DialogTriggerOwnProps = { children?: ReactNode; asChild?: boolean }

export type DialogTriggerProps = DialogTriggerOwnProps &
  Omit<PressableProps, keyof DialogTriggerOwnProps> &
  Omit<ViewStyleProps, keyof DialogTriggerOwnProps | keyof PressableProps>

type DialogOverlayOwnProps = {
  children?: ReactNode
  /** Pressing the backdrop closes the dialog. Off for one that must be answered. */
  isDismissable?: boolean
}

export type DialogOverlayProps = DialogOverlayOwnProps &
  Omit<ViewProps, keyof DialogOverlayOwnProps> &
  Omit<ViewStyleProps, keyof DialogOverlayOwnProps | keyof ViewProps>

type DialogContentOwnProps = { children?: ReactNode }

export type DialogContentProps = DialogContentOwnProps &
  Omit<ViewProps, keyof DialogContentOwnProps> &
  Omit<ViewStyleProps, keyof DialogContentOwnProps | keyof ViewProps>

type DialogTextOwnProps = { children?: ReactNode }

export type DialogTitleProps = DialogTextOwnProps &
  Omit<TextProps, keyof DialogTextOwnProps> &
  Omit<TextStyleProps, keyof DialogTextOwnProps | keyof TextProps>

export type DialogDescriptionProps = DialogTitleProps

type DialogCloseOwnProps = { children?: ReactNode; asChild?: boolean }

export type DialogCloseProps = DialogCloseOwnProps &
  Omit<PressableProps, keyof DialogCloseOwnProps> &
  Omit<ViewStyleProps, keyof DialogCloseOwnProps | keyof PressableProps>

/** R5 — resolved style ids and the state the slots read. */
export type DialogContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  panelStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  isOpen: boolean
  isDisabled: boolean
  open: () => void
  close: () => void
  toggle: () => void
}
