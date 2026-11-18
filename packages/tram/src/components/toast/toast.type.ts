import type { ReactNode } from 'react'
import type {
  GestureResponderEvent,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName } from '../../theme/tram-tokens'

export type ToastSlot = 'root' | 'title' | 'description' | 'actions'

/**
 * What the toast is about — Native's five names, each a flat fill here:
 *
 * | Variant             | Fill                 |
 * | ------------------- | -------------------- |
 * | `default`, `accent` | the theme's accent   |
 * | `success`           | the theme's success  |
 * | `warning`           | the theme's warning  |
 * | `danger`            | the theme's danger   |
 *
 * The text is the ink that reads on that fill: black on a light one, white on the rest.
 *
 * **Not Native's drawing.** There the variant colours the title on a neutral card; a Tram
 * toast is an aplat, and the colour is the whole rectangle.
 */
export type ToastVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger'

/** Which edge the pile sits against. */
export type ToastPlacement = 'top' | 'bottom'

type ToastOwnProps = {
  children?: ReactNode
  variant?: ToastVariant
  /** Overrides the Tram corner. The scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents, for a toast that is not in its variant's colour. It
   * fills exactly as `color` does; `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw fill, never a token. The text takes the ink that reads on it. */
  color?: string
  /**
   * What a touch on the toast does — opening what it is about. With it the toast shrinks
   * a little under the finger; without it a touch does nothing.
   */
  onPress?: (event: GestureResponderEvent) => void
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

type ToastCloseBehaviourProps = Omit<
  PressableFeedbackProps,
  keyof ToastCloseOwnProps | 'isPressed' | 'isDisabled'
>

export type ToastCloseProps = ToastCloseOwnProps &
  ToastCloseBehaviourProps &
  Omit<ViewStyleProps, keyof ToastCloseOwnProps | keyof ToastCloseBehaviourProps>

/** One entry in the queue. */
export type ToastRecord = {
  id: string
  variant?: ToastVariant
  /** How long before it leaves, in milliseconds. `0` keeps it until it is dismissed. */
  duration?: number
  render: (helpers: { dismiss: () => void }) => ReactNode
}

/** What `toast()` is handed. The id is the host's to give. */
export type ToastOptions = Omit<ToastRecord, 'id'>

export type ToastQueue = {
  /** Pushes one onto the pile and returns its id, so it can be dismissed early. */
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

/** The two lines a toast is announced with. */
export type ToastSpokenPart = 'title' | 'description'

/** Resolved styles, read by the slots of one toast. */
export type ToastContextValue = {
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  actionsStyle: StyleProp<ViewStyle>
  /** The colour that reads on this toast's fill — for a caller's own slot. */
  ink: string
  /** Sends this toast away early. The `Close` slot is this, and so is an action. */
  dismiss: () => void
  /** What a screen reader's "close" action is called, or nothing outside a host. */
  dismissLabel?: string
  /** The toast's own `onPress`, for the slot a screen reader lands on. */
  activate?: () => void
  /** A text slot says what it reads, so the toast can be announced as it arrives. */
  report: (part: ToastSpokenPart, text: string | null) => void
}

/** What the host hands each toast it shows. */
export type ToastEntryContextValue = {
  dismiss: () => void
  dismissLabel: string
  /** `true` under an ancestor's `disable-all`: nothing in the toast animates. */
  isStill: boolean
}
