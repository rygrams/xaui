import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { ViewStyleProps } from '../../system/style-props'
import type { FlipRotation } from '../../utils/flip'

/**
 * Which axis the card turns about.
 *
 * `horizontal` spins it about its vertical axis — the two faces swap left for right, which
 * is what a playing card does and what a reader expects. `vertical` turns it about the
 * horizontal one, which reads as the card tipping towards you.
 */
export type FlipCardDirection = 'horizontal' | 'vertical'

/** How the turn is tuned. Two knobs, deliberately — anything more is a different animation. */
export type FlipSpring = {
  stiffness?: number
  damping?: number
  mass?: number
}

type FlipCardOwnProps = {
  /** @default 'horizontal' */
  direction?: FlipCardDirection
  /** Which way round. @default 'normal' */
  rotation?: FlipRotation
  /** Which face is up. Present means controlled. */
  isFlipped?: boolean
  /** Which face is up at first mount. @default false */
  defaultFlipped?: boolean
  onFlipChange?: (isFlipped: boolean) => void
  /**
   * Whether pressing the card turns it.
   *
   * `false` leaves it a display and the flip to a control of yours — a button on one face,
   * a gesture, a timer. The card is still controllable through `isFlipped`.
   *
   * @default true
   */
  isPressable?: boolean
  /** `false` puts the card on the other face with no turn at all. */
  animation?: boolean | FlipSpring
  isDisabled?: boolean
  /** R12 — merge into the single child instead of rendering a pressable. */
  asChild?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

/** R14 — it renders a `PressableFeedback`, so it carries that node's style keys through it. */
export type FlipCardProps = FlipCardOwnProps &
  Omit<
    PressableFeedbackProps,
    'isPressed' | 'style' | 'children' | keyof FlipCardOwnProps
  >

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type FlipCardFaceProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** R10 — what a face needs to place itself in the turn. */
export type FlipCardContextValue = {
  /** 0 is the front, 1 is the back, and a spring passes through everything between. */
  progress: SharedValue<number>
  direction: FlipCardDirection
  rotation: FlipRotation
  isFlipped: boolean
  /** Turns it over. A control on a face is written against this. */
  flip: () => void
  isDisabled: boolean
}
