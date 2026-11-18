import type { ReactNode, RefObject } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { NodeSlot } from '../../system/node-slot'

export type DialogSlot =
  | 'overlay'
  | 'content'
  | 'title'
  | 'description'
  | 'trigger'
  | 'close'
  | 'label'

type DialogOwnProps = {
  children?: ReactNode
  /**
   * Native's prop, kept so the two roots take the same props. It draws nothing here: the
   * banner runs from one edge of the screen to the other and has no corner to round.
   */
  radius?: RadiusKey
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** The trigger is grey and opens nothing. */
  isDisabled?: boolean
}

/**
 * The root renders **no node** — `ref` and `style` live on the parts that draw.
 *
 * No `accent` and no `color`, which every other Tram control has: the banner is the
 * discreet surface and carries no accent. Its buttons have their own.
 */
export type DialogProps = DialogOwnProps

type DialogPressOwnProps = { children?: ReactNode; asChild?: boolean }

type DialogPressProps = DialogPressOwnProps &
  Omit<PressableProps, keyof DialogPressOwnProps> &
  Omit<ViewStyleProps, keyof DialogPressOwnProps | keyof PressableProps>

/**
 * What opens the banner. It paints nothing of its own: `asChild` makes it a `Button`,
 * which is then grey while the dialog is disabled; a string is set in `body`.
 */
export type DialogTriggerProps = DialogPressProps

type DialogOverlayOwnProps = {
  children?: ReactNode
  /**
   * Off for a banner that must be answered: neither a touch on the ground, nor a swipe,
   * nor the system's back closes it, and it resists the finger.
   */
  isDismissable?: boolean
}

export type DialogOverlayProps = DialogOverlayOwnProps &
  Omit<ViewProps, keyof DialogOverlayOwnProps> &
  Omit<ViewStyleProps, keyof DialogOverlayOwnProps | keyof ViewProps>

type DialogContentOwnProps = { children?: ReactNode }

/**
 * The banner. It starts at the very top of the screen, under the notch. Tram reads no
 * safe area: pad it with the app's own inset —
 * `<Dialog.Content paddingTop={insets.top + 24}>`.
 *
 * Each child is one step of the cascade, in the order written: the title, the
 * description, then a row of actions.
 */
export type DialogContentProps = DialogContentOwnProps &
  Omit<ViewProps, keyof DialogContentOwnProps> &
  Omit<ViewStyleProps, keyof DialogContentOwnProps | keyof ViewProps>

type DialogTextOwnProps = { children?: ReactNode }

export type DialogTitleProps = DialogTextOwnProps &
  Omit<TextProps, keyof DialogTextOwnProps> &
  Omit<TextStyleProps, keyof DialogTextOwnProps | keyof TextProps>

export type DialogDescriptionProps = DialogTitleProps

/**
 * What closes the banner. **It draws no cross**, where Native's does when left empty: a
 * `MessageBox` is closed by its buttons. `asChild` makes it one; a string is set in
 * `body`.
 */
export type DialogCloseProps = DialogPressProps

/** The banner's shared values: what the swivel, the finger and the backdrop all read. */
export type DialogMotion = {
  /** Whether the banner is still there to turn — `isOpen`, and the way out after it. */
  isMounted: boolean
  /** 0 edge-on, 1 flat. */
  turn: SharedValue<number>
  /** How much of its dimming the ground behind has, 0 to 1. */
  shade: SharedValue<number>
  /** The swivel, as the banner's last style. */
  turned: StyleProp<ViewStyle>
}

/** Resolved style ids and the state the slots read. */
export type DialogContextValue = {
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  triggerStyle: StyleProp<ViewStyle>
  closeStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  isOpen: boolean
  isDisabled: boolean
  /** An ancestor said `disable-all`: everything is set without animation. */
  isStill: boolean
  open: () => void
  close: () => void
  toggle: () => void
  motion: DialogMotion
  /** `Dialog.Overlay`'s word. True without one. */
  isDismissable: boolean
  setDismissable: (isDismissable: boolean) => void
  /** Where `Dialog.Overlay` hands its backdrop to the banner's `Modal`. */
  backdrop: NodeSlot
  /** The trigger's node: where the focus goes back to. */
  trigger: RefObject<View | null>
  titleId: string
  descriptionId: string
}
