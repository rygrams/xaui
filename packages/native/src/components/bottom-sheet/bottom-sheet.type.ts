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

export type BottomSheetSlot =
  | 'overlay'
  | 'content'
  | 'handle'
  | 'title'
  | 'description'

type BottomSheetOwnProps = {
  children?: ReactNode
  radius?: RadiusKey
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  isDisabled?: boolean
  /**
   * How far down the sheet has to be dragged before letting go closes it, as a fraction
   * of its own height.
   *
   * @default 0.35
   */
  dismissThreshold?: number
}

/** The root renders **no node** — `ref` and `style` live on the parts that draw. */
export type BottomSheetProps = BottomSheetOwnProps

type TriggerOwnProps = { children?: ReactNode; asChild?: boolean }

export type BottomSheetTriggerProps = TriggerOwnProps &
  Omit<PressableProps, keyof TriggerOwnProps> &
  Omit<ViewStyleProps, keyof TriggerOwnProps | keyof PressableProps>

type OverlayOwnProps = { children?: ReactNode; isDismissable?: boolean }

export type BottomSheetOverlayProps = OverlayOwnProps &
  Omit<ViewProps, keyof OverlayOwnProps> &
  Omit<ViewStyleProps, keyof OverlayOwnProps | keyof ViewProps>

type ContentOwnProps = {
  children?: ReactNode
  /** Whether dragging the sheet down closes it. */
  isSwipeable?: boolean
}

export type BottomSheetContentProps = ContentOwnProps &
  Omit<ViewProps, keyof ContentOwnProps> &
  Omit<ViewStyleProps, keyof ContentOwnProps | keyof ViewProps>

/** The grab bar. It draws a pill and holds nothing. */
export type BottomSheetHandleProps = Omit<ViewProps, 'children'> & ViewStyleProps

type TextOwnProps = { children?: ReactNode }

export type BottomSheetTitleProps = TextOwnProps &
  Omit<TextProps, keyof TextOwnProps> &
  Omit<TextStyleProps, keyof TextOwnProps | keyof TextProps>

export type BottomSheetDescriptionProps = BottomSheetTitleProps

type CloseOwnProps = { children?: ReactNode; asChild?: boolean }

export type BottomSheetCloseProps = CloseOwnProps &
  Omit<PressableProps, keyof CloseOwnProps> &
  Omit<ViewStyleProps, keyof CloseOwnProps | keyof PressableProps>

/** R5 — resolved style ids and the state the slots read. */
export type BottomSheetContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  handleStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  isOpen: boolean
  isDisabled: boolean
  dismissThreshold: number
  open: () => void
  close: () => void
  toggle: () => void
}
