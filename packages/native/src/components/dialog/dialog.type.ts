import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { CloseButtonBaseProps } from '../../system/close-button'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'

export type DialogSlot =
  | 'overlay'
  | 'panel'
  | 'content'
  | 'title'
  | 'description'
  | 'close'
  | 'closeGlyph'

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

/**
 * Everything the shared `CloseButtonBase` accepts, minus the three the dialog supplies itself:
 * the warning's name and the two styles its recipe already resolved (R5).
 *
 * Which means `children` is optional and the cross is drawn without it, and that a caller
 * who passes `asChild` gets their own element instead — the two dismissals a dialog has.
 */
export type DialogCloseProps = Omit<
  CloseButtonBaseProps,
  'name' | 'baseStyle' | 'glyphStyle'
>

/** R5 — resolved style ids and the state the slots read. */
export type DialogContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  panelStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  closeStyle: StyleProp<ViewStyle>
  closeGlyphStyle: StyleProp<ViewStyle>
  isOpen: boolean
  isDisabled: boolean
  open: () => void
  close: () => void
  toggle: () => void
}
