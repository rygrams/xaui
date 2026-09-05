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
import type {
  Align,
  Anchor,
  AnchoredWidth,
  Insets,
  Placement,
} from '../../utils/placement'

export type PopoverSlot = 'trigger' | 'overlay' | 'content' | 'title' | 'description'

export type PopoverPlacement = Placement
export type PopoverAlign = Align
export type PopoverWidth = AnchoredWidth
export type PopoverInsets = Insets
export type PopoverAnchor = Anchor

type PopoverOwnProps = {
  children?: ReactNode
  radius?: RadiusKey
  /** Controlled. Leave unset and the root owns it. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  isDisabled?: boolean
}

/**
 * The root renders **no node**. It is state and resolved style around a trigger and a
 * panel, and the trigger is whatever the caller put in it — which is why `ref`, `style`
 * and the a11y props are on `Popover.Trigger` rather than here.
 */
export type PopoverProps = PopoverOwnProps

type PopoverTriggerOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

export type PopoverTriggerProps = PopoverTriggerOwnProps &
  Omit<PressableProps, keyof PopoverTriggerOwnProps> &
  Omit<ViewStyleProps, keyof PopoverTriggerOwnProps | keyof PressableProps>

type PopoverOverlayOwnProps = {
  children?: ReactNode
  /** Pressing the backdrop closes the panel. Set false and only a `Close` closes it. */
  isDismissable?: boolean
}

export type PopoverOverlayProps = PopoverOverlayOwnProps &
  Omit<ViewProps, keyof PopoverOverlayOwnProps> &
  Omit<ViewStyleProps, keyof PopoverOverlayOwnProps | keyof ViewProps>

type PopoverContentOwnProps = {
  children?: ReactNode
  placement?: PopoverPlacement
  align?: PopoverAlign
  width?: PopoverWidth
  /** Distance from the trigger, in points. */
  offset?: number
  /** Shift along the alignment axis, in points. */
  alignOffset?: number
  /** Flip to the opposite side when the chosen one does not fit. */
  avoidCollisions?: boolean
  insets?: PopoverInsets
}

export type PopoverContentProps = PopoverContentOwnProps &
  Omit<ViewProps, keyof PopoverContentOwnProps> &
  Omit<ViewStyleProps, keyof PopoverContentOwnProps | keyof ViewProps>

type PopoverTextOwnProps = { children?: ReactNode }

export type PopoverTitleProps = PopoverTextOwnProps &
  Omit<TextProps, keyof PopoverTextOwnProps> &
  Omit<TextStyleProps, keyof PopoverTextOwnProps | keyof TextProps>

export type PopoverDescriptionProps = PopoverTitleProps

type PopoverCloseOwnProps = {
  children?: ReactNode
  asChild?: boolean
}

export type PopoverCloseProps = PopoverCloseOwnProps &
  Omit<PressableProps, keyof PopoverCloseOwnProps> &
  Omit<ViewStyleProps, keyof PopoverCloseOwnProps | keyof PressableProps>

/** R5 — resolved style ids and the state the slots read. */
export type PopoverContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  isOpen: boolean
  isDisabled: boolean
  open: () => void
  close: () => void
  toggle: () => void
  /** The trigger publishes its measured rectangle here; the content positions off it. */
  anchor: PopoverAnchor | null
  setAnchor: (anchor: PopoverAnchor) => void
}
