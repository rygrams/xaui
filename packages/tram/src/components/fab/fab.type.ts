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

/** The circle's diameter: 32, 40 and 48 points, around a glyph of 16, 20 and 24. */
export type FabSize = TramSize

/**
 * Where the circle sits across its bar: at the start, in the middle, at the end. The bar
 * itself is always docked along the bottom edge — the Metro App Bar's place — and never
 * sits in the flow. `start` and `end`, so a right-to-left layout moves it with no second
 * branch.
 */
export type FabPlacement = FloatPlacement

/**
 * How the circle is drawn.
 *
 * | Variant     | Drawn as                                                       |
 * | ----------- | -------------------------------------------------------------- |
 * | `contained` | a flat fill of the true colour, the glyph in the ink on it     |
 * | `outline`   | the App Bar's button: a line and a glyph in the colour as ink  |
 */
export type FabVariant = 'contained' | 'outline'

type FabOwnProps = {
  /**
   * A filled circle, or a line on the ground. Both are the same size: the filled one draws
   * its line in its fill.
   *
   * @default 'contained'
   */
  variant?: FabVariant
  /** The circle's diameter. Every size is pressed as 48: `hitSlop` makes up the rest. */
  size?: FabSize
  /**
   * One of the twenty named accents, for a `Fab` that is not in the theme's accent. A
   * `contained` circle is filled with its true colour; an `outline` is drawn in its ink,
   * moved until it reads on the ground. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** A raw tint for the fill, or the line and glyph of an outline — never corrected. */
  color?: string
  /**
   * Shows `Fab.Label`. The circle does not stretch: the label is laid under it, in the
   * bar's ink, centred — the App Bar's label — and the bar rises by the label's height,
   * as the Metro App Bar rose to show its labels.
   *
   * The label is one line as wide as the circle and the bar's side padding more on each
   * side, so it never passes the bar's edge; a longer one is cut.
   */
  isExtended?: boolean
  /**
   * Where the circle sits across the bar docked at the bottom of the nearest positioned
   * ancestor. There is no way to lay it in the flow.
   *
   * @default 'bottom-center'
   */
  placement?: FabPlacement
  /**
   * The bar's padding under the circle, in points, over the bottom safe area.
   *
   * @default 8
   */
  offset?: number
  /**
   * Adds the bottom safe area — a home indicator, a navigation bar — under `offset`, so
   * the bar runs down under it. The insets come from the hook the app handed
   * `TramProvider` (`safeArea={{ useSafeAreaInsets }}`); without one they are 0. `false`
   * for a bar docked in a box that does not reach the screen's bottom edge — a card, a
   * sheet.
   *
   * @default true
   */
  hasSafeArea?: boolean
  /**
   * `false` sends the bar back under the bottom edge, where it stays laid out but can be
   * neither seen, pressed nor read; `true` brings it back up. Tram's own: the Metro App
   * Bar leaves and returns with the page.
   *
   * @default true
   */
  isVisible?: boolean
  /**
   * A flat grey circle — or a grey line — that does not answer. The grey is the state:
   * nothing is dimmed.
   */
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
 * The Native `Fab`'s props, less `radius`: a Tram `Fab` is a circle. `variant` is Tram's
 * two drawings, `accent` and `isVisible` are Tram's, and `placement` is never unset.
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
