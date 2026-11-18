import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type {
  IconContextValue,
  IconProps,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { FloatPlacement } from '../../system/float-place'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type FabSlot = 'root' | 'label' | 'icon' | 'spinner'

/** The circle's diameter: 48, 56 and 64 points, around a glyph of 20, 24 and 28. */
export type FabSize = TramSize

/**
 * Where it floats, or nowhere. Unset, it sits in the flow like any other control. The
 * three others pin it to the bottom of its nearest positioned ancestor — `start` and
 * `end`, so a right-to-left layout moves it with no second branch.
 */
export type FabPlacement = FloatPlacement

type FabOwnProps = {
  /** The circle's diameter. Every size reaches the 48-point touch target. */
  size?: FabSize
  /**
   * One of the twenty named accents, for a `Fab` that is not in the theme's accent. The
   * circle is filled with its true colour; `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint for the circle, never a token and never corrected. */
  color?: string
  /**
   * Shows `Fab.Label`. The circle does not stretch: the label is laid under it, in the
   * page's ink, centred — the App Bar's label — and the circle moves up by the label's
   * height, so the bottom of the pair stays where the bottom of the circle was.
   *
   * The label is one line as wide as the circle and `offset` more on each side, so it
   * never passes the edge the `Fab` is pinned from; a longer one is cut.
   */
  isExtended?: boolean
  /** Pinned to the bottom of the nearest positioned ancestor. Unset, it sits in the flow. */
  placement?: FabPlacement
  /**
   * How far in from the bottom edge and from the side it is on, in points.
   *
   * **The `Fab` reads no safe area.** This is the whole distance to the edges: the caller
   * adds the bottom inset — a home indicator, a navigation bar — to it.
   *
   * @default 16
   */
  offset?: number
  /**
   * `false` sends it back under the bottom edge, where it stays laid out but can be
   * neither seen, pressed nor read; `true` brings it back up. Tram's own: the Metro App
   * Bar leaves and returns with the page.
   *
   * @default true
   */
  isVisible?: boolean
  /** A flat grey circle that does not answer. The grey is the state: nothing is dimmed. */
  isDisabled?: boolean
  /**
   * `Fab.Spinner` takes the glyph's place and the press stops. The colours stay: a busy
   * `Fab` is not an unavailable one.
   */
  isLoading?: boolean
  /** `Pressable`'s function form as much as an object or an array. Lands on the circle. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  /**
   * The glyph — a `Fab.Icon` — and, as direct children, a `Fab.Label` and a `Fab.Spinner`
   * when the default one will not do. A bare string is a label.
   */
  children?: ReactNode
}

type FabBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

/**
 * The Native `Fab`'s props, less `variant` and `radius`: there is one Tram `Fab`, a filled
 * circle. `accent` and `isVisible` are Tram's.
 */
export type FabProps = FabOwnProps &
  FabBehaviourProps &
  Omit<ViewStyleProps, keyof FabOwnProps>

export type FabLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** `size` and `color` default to what the root resolved; passing either wins. */
export type FabIconProps = IconProps

type FabSpinnerOwnProps = {
  style?: StyleProp<ViewStyle>
  /** `false` stops the rotation. The ring stays, as a fixed state. */
  animation?: boolean
}

export type FabSpinnerProps = FabSpinnerOwnProps &
  Omit<ViewStyleProps, keyof FabSpinnerOwnProps>

/** The two colours a label fades between, and how far it is toward the grey one. */
export type FabLabelTone = {
  ink: string
  grey: string
  /** 0 in the page's ink, 1 in the grey of a disabled `Fab`. */
  dim: SharedValue<number>
}

/** Resolved styles, not props for a slot to resolve a second time. */
export type FabContextValue = {
  labelStyle: StyleProp<TextStyle>
  labelTone: FabLabelTone
  spinnerStyle: StyleProp<ViewStyle>
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
  isDisabled: boolean
  isLoading: boolean
  isExtended: boolean
  /** An ancestor, or the `Fab` itself, asked for no animation at all. */
  isStill: boolean
}
