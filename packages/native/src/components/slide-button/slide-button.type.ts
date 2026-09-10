import type { ReactNode } from 'react'
import type { SharedValue } from 'react-native-reanimated'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue, IconProps } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'

export type SlideButtonSlot =
  | 'root'
  | 'fillClip'
  | 'fill'
  | 'label'
  | 'labelSwept'
  | 'thumb'
  | 'glyph'

/**
 * The flat variant union, the same ten values every control in the library takes. A
 * slide-to-confirm is still a button — a slide-to-delete is a real `danger` use — so the
 * intents stay.
 */
export type SlideButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'

export type SlideButtonSize = 'sm' | 'md' | 'lg'

type SlideButtonOwnProps = {
  children?: ReactNode
  variant?: SlideButtonVariant
  /** Height, horizontal padding and the label's type. Never a width. */
  size?: SlideButtonSize
  /** Overrides the pill's corner. `full` unless you say otherwise. */
  radius?: RadiusKey
  /** A raw tint (R7). Lands on the pill, or on the label for `ghost` — never on the thumb. */
  color?: string
  /**
   * How far along the track the thumb has to reach for the slide to count, from 0 to 1.
   * Below it the thumb springs home on release.
   * @default 0.9
   */
  threshold?: number
  /** Controlled: `true` pins the thumb at the end, `false` springs it home. */
  isConfirmed?: boolean
  /** The starting state when uncontrolled. Once confirmed it stays confirmed. @default false */
  defaultConfirmed?: boolean
  /** Fires once, when the thumb reaches `threshold` — the action the slide guards. */
  onConfirm?: () => void
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

export type SlideButtonProps = SlideButtonOwnProps &
  Omit<ViewProps, keyof SlideButtonOwnProps> &
  Omit<ViewStyleProps, keyof SlideButtonOwnProps | keyof ViewProps>

type SlideButtonFillOwnProps = { children?: never }

export type SlideButtonFillProps = SlideButtonFillOwnProps &
  Omit<ViewProps, 'children'> &
  Omit<ViewStyleProps, keyof ViewProps>

export type SlideButtonLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type SlideButtonThumbOwnProps = {
  /** Replaces the built-in chevron — an `Icon`, or anything else. */
  children?: ReactNode
}

export type SlideButtonThumbProps = SlideButtonThumbOwnProps &
  Omit<ViewProps, keyof SlideButtonThumbOwnProps> &
  Omit<ViewStyleProps, keyof SlideButtonThumbOwnProps | keyof ViewProps>

export type SlideButtonIconProps = IconProps

/** R5 — resolved style ids and the shared progress the animated slots read. */
export type SlideButtonContextValue = {
  /** The window the trail is cut to — the pill's shape, so the cut stays off the handle. */
  fillClipStyle: StyleProp<ViewStyle>
  fillStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  /** The label's swept copy, already carrying the width the clip must not re-centre it in. */
  labelSweptStyle: StyleProp<TextStyle>
  thumbStyle: StyleProp<ViewStyle>
  glyphStyle: StyleProp<ViewStyle>
  icon: IconContextValue
  /** The handle's offset from the leading edge, in points, driven on the UI thread. */
  offset: SharedValue<number>
  /** How far the handle can travel — the track's length less the handle and its insets. */
  travel: number
  /** The handle's width, the amount the travel is shortened by. */
  thumbSize: number
  /** The fraction of `travel` the thumb must reach for the slide to count, from 0 to 1. */
  threshold: number
  isDisabled: boolean
  isConfirmed: boolean
  /** Called from the pan on release once the thumb has reached `threshold`. */
  confirm: () => void
  /** The pill's measured width. Zero until it has been laid out. */
  trackLength: number
}
