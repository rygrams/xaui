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

export type ToastSlot = 'root' | 'title' | 'description' | 'actions'

/**
 * What the toast is about, and the only thing a variant changes here: the **title's**
 * colour. The surface stays the theme's floating one whatever happened — a red card
 * sliding in from the edge of the screen reads as the app breaking, where a red line of
 * text reads as the thing you just did failing.
 */
export type ToastVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger'

/** Where the stack sits. */
export type ToastPlacement = 'top' | 'bottom'

type ToastOwnProps = {
  children?: ReactNode
  variant?: ToastVariant
  radius?: RadiusKey
}

export type ToastProps = ToastOwnProps &
  Omit<ViewProps, keyof ToastOwnProps> &
  Omit<ViewStyleProps, keyof ToastOwnProps | keyof ViewProps>

type ToastTextOwnProps = { children?: ReactNode }

export type ToastTitleProps = ToastTextOwnProps &
  Omit<TextProps, keyof ToastTextOwnProps> &
  Omit<TextStyleProps, keyof ToastTextOwnProps | keyof TextProps>

export type ToastDescriptionProps = ToastTitleProps

type ToastActionsOwnProps = { children?: ReactNode }

export type ToastActionsProps = ToastActionsOwnProps &
  Omit<ViewProps, keyof ToastActionsOwnProps> &
  Omit<ViewStyleProps, keyof ToastActionsOwnProps | keyof ViewProps>

type ToastCloseOwnProps = { children?: ReactNode; asChild?: boolean }

export type ToastCloseProps = ToastCloseOwnProps &
  Omit<PressableProps, keyof ToastCloseOwnProps> &
  Omit<ViewStyleProps, keyof ToastCloseOwnProps | keyof PressableProps>

/** One entry in the queue. */
export type ToastRecord = {
  id: string
  variant?: ToastVariant
  /** How long before it leaves, in milliseconds. `0` keeps it until it is dismissed. */
  duration?: number
  render: (helpers: { dismiss: () => void }) => ReactNode
}

/** What `toast()` is handed. The id is the provider's to give. */
export type ToastOptions = Omit<ToastRecord, 'id'>

export type ToastQueue = {
  /** Pushes one onto the stack and returns its id, so it can be dismissed early. */
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

/** R5 — resolved style ids, read by the slots of one toast. */
export type ToastContextValue = {
  rootStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  actionsStyle: StyleProp<ViewStyle>
  /** Sends this toast away early. The `Close` slot is this, and so is an action. */
  dismiss: () => void
}
